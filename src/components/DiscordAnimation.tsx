import { motion } from "motion/react";

export default function DiscordAnimation() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      {/* Outer Pulse */}
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-64 h-64 border border-[#5865F2] rounded-full shadow-[0_0_30px_#5865F2_inset]"
      />
      
      {/* Middle Spinning Ring */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute w-48 h-48 border-2 border-dashed border-[#ff00aa] rounded-full opacity-60 shadow-[0_0_20px_#ff00aa]"
      />
      
      {/* Core Glowing Orb */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-32 h-32 bg-gradient-to-br from-[#5865F2] to-[#ff00aa] rounded-full flex items-center justify-center shadow-[0_0_60px_#5865F2]"
      >
        <div className="absolute inset-2 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-sm" />
        
        {/* Discord Face Abstraction */}
        <div className="flex gap-4 relative z-10">
          <motion.div 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            className="w-4 h-6 bg-white rounded-full shadow-[0_0_10px_white]" 
          />
          <motion.div 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            className="w-4 h-6 bg-white rounded-full shadow-[0_0_10px_white]" 
          />
        </div>
      </motion.div>
      
      {/* Floating Holographic Elements */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -80], 
            opacity: [0, 1, 0], 
            scale: [0.5, 1, 0.5],
            x: Math.sin(i) * 50
          }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
          className="absolute w-10 h-10 bg-[#00e5ff]/80 backdrop-blur-md rounded-2xl rounded-bl-none shadow-[0_0_20px_#00e5ff] border border-white/20"
          style={{ top: '50%', left: '50%', marginLeft: '-20px', marginTop: '-20px' }}
        >
          <div className="absolute inset-2 bg-white/30 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}
