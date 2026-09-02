import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { portfolioData } from '../data';
import { playHover } from '../utils/audio';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: string;
  radius: number;
  label: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

interface Props {
  onHoverSkill: (skill: string | null) => void;
}

export default function SkillGraph({ onHoverSkill }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 700;

    d3.select(containerRef.current).selectAll('*').remove();

    const nodes: Node[] = [{ id: 'CORE', group: 'center', radius: 30, label: 'CORE_SYS' }];
    const links: Link[] = [];

    Object.entries(portfolioData.skills).forEach(([category, skills]) => {
      // Use the actual category string as ID, but clean it up for the graph
      nodes.push({ id: category, group: 'category', radius: 18, label: category });
      links.push({ source: 'CORE', target: category });

      skills.forEach(skill => {
        nodes.push({ id: skill, group: 'skill', radius: 10, label: skill });
        links.push({ source: category, target: skill });
      });
    });

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    // Add glowing filter
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'neon-glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    svg.on('click', (event) => {
      if (event.target.tagName === 'svg' || event.target.tagName === 'DIV') {
        onHoverSkill(null);
      }
    });

    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(d => d.source === 'CORE' || (d.source as Node).id === 'CORE' ? 200 : 100))
      .force('charge', d3.forceManyBody().strength(-800))
      .force('collide', d3.forceCollide().radius(d => (d as Node).radius + 40))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => (d.source as Node).id === 'CORE' ? '#ff00aa' : '#00e5ff')
      .attr('stroke-width', (d) => (d.source as Node).id === 'CORE' ? 2 : 1)
      .attr('stroke-opacity', 0.4)
      .style('filter', 'url(#neon-glow)');

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation) as any);

    node.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => {
        if (d.group === 'center') return '#00e5ff';
        if (d.group === 'category') return '#ff00aa';
        return '#0a0a0c';
      })
      .attr('stroke', d => d.group === 'skill' ? '#00e5ff' : 'none')
      .attr('stroke-width', 2)
      .style('filter', d => d.group !== 'skill' ? 'url(#neon-glow)' : 'none');

    // Inner core for center
    node.filter(d => d.group === 'center')
      .append('circle')
      .attr('r', 15)
      .attr('fill', '#ffffff')
      .style('filter', 'url(#neon-glow)');

    node.append('text')
      .text(d => d.label)
      .attr('x', d => d.radius + 5)
      .attr('y', 4)
      .style('font-family', 'monospace')
      .style('font-size', d => d.group === 'skill' ? '10px' : '12px')
      .style('fill', d => d.group === 'skill' ? '#888' : '#fff')
      .style('pointer-events', 'none')
      .attr('font-weight', d => d.group !== 'skill' ? 'bold' : 'normal');

    node.on('mouseenter', (event, d) => {
      if (d.group === 'skill') {
        playHover();
        d3.select(event.currentTarget as any).select('circle')
          .attr('fill', '#00e5ff')
          .style('filter', 'url(#neon-glow)');
        d3.select(event.currentTarget as any).select('text')
          .style('fill', '#fff')
          .style('font-size', '12px')
          .attr('font-weight', 'bold');
      }
    }).on('mouseleave', (event, d) => {
      if (d.group === 'skill') {
        d3.select(event.currentTarget as any).select('circle')
          .attr('fill', '#0a0a0c')
          .style('filter', 'none');
        d3.select(event.currentTarget as any).select('text')
          .style('fill', '#888')
          .style('font-size', '10px')
          .attr('font-weight', 'normal');
      }
    }).on('click', (event, d) => {
      if (d.group === 'skill') {
        onHoverSkill(d.id);
      }
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: d3.Simulation<Node, undefined>) {
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    return () => {
      simulation.stop();
    };
  }, [onHoverSkill]);

  return <div ref={containerRef} className="w-full bg-[#0a0a0c] border border-[#2a2a35] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]" />;
}
