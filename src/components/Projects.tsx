import { useState } from "react";
import { portfolioData } from "../data";
import DiscordAnimation from "./DiscordAnimation";
import MinecraftAnimation from "./MinecraftAnimation";
import HardwareAnimation from "./HardwareAnimation";
import PhoneAnimation from "./PhoneAnimation";
import FadeIn from "./FadeIn";
import AnimatedCounter from "./AnimatedCounter";
import ProjectMiniChart from "./ProjectMiniChart";
import DroneContainer from "./DroneContainer";

const projectMetrics = [
  { count: 12450, label: "Lines of Code" },
  { count: 420, label: "Commits" },
  { count: 315, label: "Hours Logged" },
  { count: 85, label: "SVG Assets" }
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = portfolioData.projects[activeIndex];
  const metric = projectMetrics[activeIndex] || { count: 100, label: "Contributions" };

  return (
    <section className="mb-32 relative z-10 w-full max-w-6xl mx-auto px-4">
      <div className="mb-10">
        <FadeIn delay={0.1} direction="left">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)] mb-2 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--color-primary)] to-transparent block"></span>
            CAMPAIGN_MISSIONS // PORTFOLIO
          </h2>
        </FadeIn>
      </div>
      
      {/* Tab Navigation for Drone switching */}
      <div className="flex flex-wrap gap-4 mb-16 justify-center relative z-20">
        {portfolioData.projects.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeIndex === idx 
                ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_15px_rgba(224,122,95,0.4)] transform scale-105' 
                : 'bg-white/50 text-gray-500 hover:bg-white border border-gray-200'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <DroneContainer mode="fly-in-out" contentKey={activeIndex}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
          {/* Visual Interactive Animation Component */}
          <div className="flex-1 w-full flex justify-center items-center relative min-h-[300px]">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-bold uppercase z-20">
              MISSION 0{activeIndex + 1}
            </div>
            <div className="absolute top-0 left-0 z-20 opacity-100 transition-opacity">
              <ProjectMiniChart projectIndex={activeIndex} />
            </div>
            <div className="w-full h-full flex justify-center items-center mt-8">
              {activeIndex === 0 && <MinecraftAnimation />}
              {activeIndex === 1 && <DiscordAnimation />}
              {activeIndex === 2 && <HardwareAnimation />}
              {activeIndex === 3 && <PhoneAnimation />}
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 w-full space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] tracking-tight">
              {project.title}
            </h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              {project.objective}
            </p>
            
            <div className="flex flex-wrap gap-2 py-2">
              {project.technology.split(', ').map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-[10px] md:text-xs font-semibold uppercase tracking-wider rounded-md cursor-default shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-gray-200 pt-6">
              <div>
                <h4 className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest mb-2">Role</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{project.contribution}</p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest mb-2">Outcome</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{project.outcome}</p>
                </div>
                <AnimatedCounter value={metric.count} label={metric.label} />
              </div>
              <div className="md:col-span-2 bg-white/50 p-5 rounded-xl border border-gray-100 relative overflow-hidden group">
                <h4 className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center justify-between relative z-10">
                  XP & Loot 
                  <span className="text-gray-400 max-w-[50%] text-right truncate" title={`Evidence: ${project.evidence}`}>Evidence: {project.evidence}</span>
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed relative z-10">{project.learning}</p>
              </div>
            </div>
          </div>
        </div>
      </DroneContainer>
    </section>
  );
}
