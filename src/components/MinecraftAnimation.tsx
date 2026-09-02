import { motion } from "motion/react";

export default function MinecraftAnimation() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      {/* Glowing aura */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 bg-[#22c55e] rounded-full blur-[70px] opacity-40"
      />
      
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
          {/* Top Face (Grass) */}
          <div className="absolute w-32 h-32 border-2 border-[#4ade80]/50" 
               style={{ transform: 'rotateX(90deg) translateZ(64px)', background: 'linear-gradient(135deg, #4ade80, #16a34a)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)' }}>
             <div className="w-full h-full opacity-50 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
          </div>
          
          {/* Bottom Face (Dirt) */}
          <div className="absolute w-32 h-32 bg-[#713f12] border-2 border-[#451a03]" 
               style={{ transform: 'rotateX(-90deg) translateZ(64px)', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)' }} />
          
          {/* Front Face */}
          <div className="absolute w-32 h-32 bg-[#854d0e] border-2 border-[#713f12] overflow-hidden" 
               style={{ transform: 'translateZ(64px)' }}>
             <div className="w-full h-10 bg-[#22c55e] absolute top-0 left-0 shadow-[0_4px_0_#16a34a]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 70% 100%, 30% 70%, 0 90%)' }} />
             <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* Back Face */}
          <div className="absolute w-32 h-32 bg-[#854d0e] border-2 border-[#713f12] overflow-hidden" 
               style={{ transform: 'rotateY(180deg) translateZ(64px)' }}>
             <div className="w-full h-10 bg-[#22c55e] absolute top-0 left-0 shadow-[0_4px_0_#16a34a]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 80% 100%, 20% 80%, 0 100%)' }} />
             <div className="absolute inset-0 bg-black/40" />
          </div>
          
          {/* Right Face */}
          <div className="absolute w-32 h-32 bg-[#a16207] border-2 border-[#713f12] overflow-hidden" 
               style={{ transform: 'rotateY(90deg) translateZ(64px)' }}>
             <div className="w-full h-12 bg-[#22c55e] absolute top-0 left-0 shadow-[0_4px_0_#16a34a]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 60% 70%, 40% 100%, 0 80%)' }} />
             <div className="absolute inset-0 bg-black/30" />
          </div>
          
          {/* Left Face */}
          <div className="absolute w-32 h-32 bg-[#713f12] border-2 border-[#451a03] overflow-hidden" 
               style={{ transform: 'rotateY(-90deg) translateZ(64px)' }}>
             <div className="w-full h-10 bg-[#22c55e] absolute top-0 left-0 shadow-[0_4px_0_#16a34a]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 20% 70%, 0 90%)' }} />
             <div className="absolute inset-0 bg-black/50" />
          </div>
        </motion.div>
      </div>
      
      {/* Floating 3D Orbs/Pixels */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [-30, 30, -30], x: [-15, 15, -15], opacity: [0, 1, 0] }}
          transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          className="absolute w-4 h-4 rounded-sm z-20"
          style={{ 
             left: `${30 + Math.random() * 40}%`, 
             top: `${20 + Math.random() * 60}%`,
             backgroundColor: i % 2 === 0 ? '#00e5ff' : '#22c55e',
             boxShadow: i % 2 === 0 ? '0 0 15px #00e5ff' : '0 0 15px #22c55e'
          }}
        />
      ))}
    </div>
  );
}
