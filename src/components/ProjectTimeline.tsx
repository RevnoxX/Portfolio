import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { portfolioData } from '../data';
import { motion, useTransform, MotionValue } from 'motion/react';

interface ProjectTimelineProps {
  scrollYProgress: MotionValue<number>;
}

export default function ProjectTimeline({ scrollYProgress }: ProjectTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Map scroll progress to a width percentage (0 to 100%)
  const progressWidth = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 40;
    const margin = { top: 10, right: 30, bottom: 10, left: 30 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(containerRef.current).selectAll('*').remove();

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw base timeline axis
    g.append('line')
      .attr('x1', 0)
      .attr('y1', innerHeight / 2)
      .attr('x2', innerWidth)
      .attr('y2', innerHeight / 2)
      .attr('stroke', '#2a2a35')
      .attr('stroke-width', 2);

    const projects = portfolioData.projects.map((p, i) => ({
      ...p,
      index: i,
      x: (innerWidth / (portfolioData.projects.length - 1)) * i,
      color: i % 2 === 0 ? '#00e5ff' : '#ff00aa'
    }));

    // Draw nodes
    const nodes = g.selectAll('.node')
      .data(projects)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${innerHeight / 2})`);

    nodes.append('circle')
      .attr('r', 6)
      .attr('fill', '#0a0a0c')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function() {
        d3.select(this).transition().duration(200).attr('r', 10).attr('fill', (d: any) => d.color);
      })
      .on('mouseleave', function() {
        d3.select(this).transition().duration(200).attr('r', 6).attr('fill', '#0a0a0c');
      });

    // Draw labels
    nodes.append('text')
      .text(d => `M0${d.index + 1}`)
      .attr('y', (d, i) => i % 2 === 0 ? -12 : 20)
      .attr('text-anchor', 'middle')
      .style('font-family', 'monospace')
      .style('font-size', '10px')
      .style('fill', '#888')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none');

    // Hover area for titles
    nodes.append('text')
      .attr('class', 'title-text')
      .text(d => d.title.length > 20 ? d.title.substring(0, 20) + '...' : d.title)
      .attr('y', (d, i) => i % 2 === 0 ? -25 : 30)
      .attr('text-anchor', 'middle')
      .style('font-family', 'monospace')
      .style('font-size', '9px')
      .style('fill', d => d.color)
      .style('opacity', 0)
      .style('pointer-events', 'none');

    nodes.on('mouseenter.text', function() {
      d3.select(this).select('.title-text').transition().duration(200).style('opacity', 1);
    })
    .on('mouseleave.text', function() {
      d3.select(this).select('.title-text').transition().duration(200).style('opacity', 0);
    });

  }, []);

  return (
    <div className="mb-2 bg-[#0a0a0c] border border-[#0a0a0c] rounded-lg overflow-hidden relative shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="absolute top-1 left-2 text-[8px] font-mono text-gray-500 tracking-widest uppercase z-20">
        Campaign_Timeline
      </div>
      <div className="absolute left-[30px] right-[30px] top-[20px] h-[2px] bg-transparent z-10 pointer-events-none">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#00e5ff] to-[#ff00aa] shadow-[0_0_10px_#00e5ff]"
          style={{ width: progressWidth }}
        />
      </div>
      <div ref={containerRef} className="w-full h-[60px] relative z-0 pt-2" />
    </div>
  );
}
