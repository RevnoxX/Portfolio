import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playClick } from '../utils/audio';

const navItems = [
  { id: 'profile', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'loadout', label: 'Loadout' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'roadmap', label: 'Goals' },
  { id: 'contact', label: 'Contact' },
];

export default function NavBar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = '';
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = item.id;
          }
        }
      }
      if (current && current !== activeId) {
        setActiveId(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  const handleNavClick = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-black text-xl tracking-tighter text-[var(--color-primary)] cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          PORTFOLIO.
        </div>
        
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs uppercase tracking-widest font-bold transition-colors ${
                activeId === item.id ? 'text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
