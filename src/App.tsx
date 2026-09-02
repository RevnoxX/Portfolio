import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Loadout from "./components/Loadout";
import Certificates from "./components/Certificates";
import RoadmapReflection from "./components/RoadmapReflection";
import Loader from "./components/Loader";
import Contact from "./components/Contact";
import NavBar from "./components/NavBar";
import { portfolioData } from "./data";
import { useDynamicTitle } from "./hooks/useDynamicTitle";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useDynamicTitle();

  // Magnetic Parallax logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const heroX1 = useTransform(smoothX, [-1, 1], [-10, 10]);
  const heroY1 = useTransform(smoothY, [-1, 1], [-10, 10]);
  const heroX2 = useTransform(smoothX, [-1, 1], [-5, 5]);
  const heroY2 = useTransform(smoothY, [-1, 1], [-5, 5]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-primary)] selection:text-white relative">
      <NavBar activeSection={activeSection} />
      
      <AnimatePresence>
        {isLoading && <Loader key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-dvh relative"
        >
          {/* Hero Section */}
          <header className="min-h-dvh flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <motion.div style={{ x: heroX1, y: heroY1 }}>
                <div className="mb-6 inline-flex items-center gap-2 bg-white/50 border border-gray-200 text-gray-500 text-xs uppercase font-bold tracking-widest px-4 py-2 rounded-full shadow-sm">
                  <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse"></span>
                  Hello, I am
                </div>
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-6 leading-none relative">
                  {portfolioData.name.split(' ')[0]} <br className="hidden md:block"/> 
                  <span className="text-gradient">{portfolioData.name.split(' ')[1] || ''}</span>
                </h1>
                <p className="text-2xl md:text-3xl text-gray-500 font-light tracking-wide max-w-3xl">
                  {portfolioData.academics}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-[var(--color-primary)] block"></span>
                  <p className="text-sm md:text-base text-gray-400 uppercase tracking-widest font-semibold">
                    {portfolioData.university}
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 max-w-3xl"
            >
              <motion.div style={{ x: heroX2, y: heroY2 }} className="flex flex-wrap gap-4">
                {portfolioData.domains.map((domain, i) => (
                  <span key={i} className="bg-white/60 border border-gray-200 text-gray-600 text-xs font-bold px-6 py-3 rounded-full uppercase tracking-widest cursor-default shadow-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
                    {domain}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-40">
            <div id="profile">
              <Profile />
            </div>
            
            <div id="skills">
              <Skills />
            </div>
            
            <div id="loadout">
              <Loadout />
            </div>
            
            <div id="projects">
              <Projects />
            </div>

            <div id="certificates">
              <Certificates />
            </div>
            
            <div id="roadmap">
              <RoadmapReflection />
            </div>
            
            <div id="contact">
              <Contact />
            </div>
          </main>

          <footer className="text-center text-gray-400 text-sm py-24 border-t border-gray-200 mt-32 relative z-10 uppercase tracking-widest font-bold flex flex-col items-center justify-center gap-6">
            <p>© {new Date().getFullYear()} {portfolioData.name}</p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
