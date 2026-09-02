import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import { portfolioData } from "../data";

export default function Skills() {
  return (
    <section className="mb-32 relative z-10 w-full max-w-5xl mx-auto px-4">
      <FadeIn delay={0.1} direction="up">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)] flex items-center gap-4 ml-2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--color-primary)] to-transparent block"></span>
            Skill_Tree // UNLOCKED
          </h2>
        </div>
      </FadeIn>
      
      <div className="flex flex-col gap-16">
        <FadeIn delay={0.2} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(portfolioData.skills).map(([category, skills], index) => (
              <motion.div 
                key={category}
                className="glass-card p-6 h-full"
              >
                <div className="flex items-center justify-between mb-6 relative z-10 border-b border-gray-200 pb-4">
                  <h3 className="text-sm uppercase tracking-wider font-bold text-[var(--color-text)]">{category}</h3>
                  <span className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-widest">TIER {index + 1}</span>
                </div>
                
                <ul className="flex flex-wrap gap-2 relative z-10">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 bg-white/50 border border-white text-gray-700 text-xs font-medium rounded shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
