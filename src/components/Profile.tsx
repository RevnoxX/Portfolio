import { motion } from "motion/react";
import { portfolioData } from "../data";
import FadeIn from "./FadeIn";

export default function Profile() {
  return (
    <FadeIn delay={0.2} direction="up" className="mb-32 relative z-10">
      <div className="glass-card p-10 sm:p-16">
        <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)] mb-10 flex items-center gap-4 relative z-10">
          <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--color-primary)] to-transparent block"></span>
          About Me // PROFILE
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 relative z-10 items-center md:items-start">
          <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=400" 
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          
          <ul className="space-y-6 text-gray-700 text-lg sm:text-xl font-medium max-w-4xl">
            {portfolioData.aboutMe.map((item, index) => (
              <li 
                key={index} 
                className="flex items-start"
              >
                <span className="mr-6 mt-3 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0"></span>
                <span className="leading-relaxed tracking-wide">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}
