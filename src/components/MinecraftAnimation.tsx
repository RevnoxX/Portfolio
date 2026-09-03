import { motion } from "motion/react";

export default function MinecraftAnimation() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="relative z-10 w-48 h-48 flex items-center justify-center" style={{ perspective: '1200px' }}>
        <motion.div 
          animate={{ rotateY: [0, 360], rotateX: [-15, -25, -15], y: [-10, 10, -10] }}
          transition={{ 
            rotateY: { duration: 12, repeat: Infinity, ease: "linear" }, 
            rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-full h-full relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        >
          <img 
            src="/assets/minecraftlogo.png" 
            alt="Minecraft Logo" 
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{ transform: 'translateZ(20px)' }}
          />
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
             backgroundColor: i % 2 === 0 ? '#4ade80' : '#22c55e',
          }}
        />
      ))}
    </div>
  );
}
