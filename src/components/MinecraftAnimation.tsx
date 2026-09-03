import { motion } from "motion/react";

export default function MinecraftAnimation() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      {/* 3D Isometric Container */}
      <div className="relative w-32 h-32 z-10" style={{ perspective: '1200px' }}>
        <motion.div
          animate={{ rotateY: [0, 360], rotateX: [-15, -25, -15] }}
          transition={{ 
            rotateY: { duration: 12, repeat: Infinity, ease: "linear" }, 
            rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        >
          {/* Top Face */}
          <div className="absolute w-32 h-32 bg-white/10 border-2 border-[var(--color-primary)]/50 flex items-center justify-center overflow-hidden backdrop-blur-md" 
               style={{ transform: 'rotateX(90deg) translateZ(64px)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
             <img src="/assets/minecraftlogo.png" alt="logo" className="w-[80%] h-[80%] object-contain opacity-50" />
          </div>
          
          {/* Bottom Face */}
          <div className="absolute w-32 h-32 bg-gray-100 border-2 border-gray-300" 
               style={{ transform: 'rotateX(-90deg) translateZ(64px)', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2)' }} />
          
          {/* Front Face */}
          <div className="absolute w-32 h-32 bg-white border-2 border-gray-200 overflow-hidden flex items-center justify-center" 
               style={{ transform: 'translateZ(64px)' }}>
             <img src="/assets/minecraftlogo.png" alt="Minecraft Logo" className="w-full h-full object-contain p-2 drop-shadow-md" />
             <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
          </div>
          
          {/* Back Face */}
          <div className="absolute w-32 h-32 bg-white border-2 border-gray-200 overflow-hidden flex items-center justify-center" 
               style={{ transform: 'rotateY(180deg) translateZ(64px)' }}>
             <img src="/assets/minecraftlogo.png" alt="Minecraft Logo" className="w-full h-full object-contain p-2 drop-shadow-md" />
             <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
          </div>
          
          {/* Right Face */}
          <div className="absolute w-32 h-32 bg-gray-50 border-2 border-gray-200 overflow-hidden flex items-center justify-center" 
               style={{ transform: 'rotateY(90deg) translateZ(64px)' }}>
             <img src="/assets/minecraftlogo.png" alt="Minecraft Logo" className="w-full h-full object-contain p-2 drop-shadow-md" />
             <div className="absolute inset-0 bg-black/5" />
          </div>
          
          {/* Left Face */}
          <div className="absolute w-32 h-32 bg-gray-50 border-2 border-gray-200 overflow-hidden flex items-center justify-center" 
               style={{ transform: 'rotateY(-90deg) translateZ(64px)' }}>
             <img src="/assets/minecraftlogo.png" alt="Minecraft Logo" className="w-full h-full object-contain p-2 drop-shadow-md" />
             <div className="absolute inset-0 bg-black/5" />
          </div>
        </motion.div>
      </div>
      
      {/* Subtle floating particles behind */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [-30, 30, -30], x: [-15, 15, -15], opacity: [0, 0.5, 0] }}
          transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          className="absolute w-2 h-2 rounded-sm z-0"
          style={{ 
             left: `${20 + Math.random() * 60}%`, 
             top: `${20 + Math.random() * 60}%`,
             backgroundColor: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-text)',
             opacity: 0.2
          }}
        />
      ))}
    </div>
  );
}
