import { motion } from "motion/react";
import { portfolioData } from "../data";
import FadeIn from "./FadeIn";

export default function RoadmapReflection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32 relative z-10 max-w-5xl mx-auto px-4">
      <FadeIn direction="left" delay={0.1}>
        <motion.section 
          whileHover={{ y: -5 }}
          className="glass-card p-10 h-full"
        >
          <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)] mb-8 flex items-center gap-4 relative z-10">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--color-primary)] to-transparent block"></span>
            Future Goals
          </h2>
          <ul className="space-y-6 relative z-10 text-gray-700">
            {portfolioData.roadmap.map((item, index) => (
              <li 
                key={index} 
                className="flex items-start"
              >
                <span className="mr-4 text-[var(--color-primary)] font-bold shrink-0 text-xl leading-none mt-0.5 group-hover:scale-125 transition-transform duration-300">↗</span>
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </FadeIn>

      <FadeIn direction="right" delay={0.2}>
        <motion.section 
          whileHover={{ y: -5 }}
          className="glass-card p-10 h-full"
        >
          <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)] mb-8 flex items-center gap-4 relative z-10">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--color-primary)] to-transparent block"></span>
            Reflection
          </h2>
          <ul className="space-y-6 text-gray-700 relative z-10">
            {portfolioData.reflection.map((item, index) => (
              <li 
                key={index} 
                className="flex items-start"
              >
                <span className="mr-4 text-[var(--color-primary)] font-bold shrink-0 text-xl leading-none mt-0.5 group-hover:rotate-90 transition-transform duration-300">✦</span>
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </FadeIn>
    </div>
  );
}
