import { motion } from "motion/react";

export default function HardwareAnimation() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center" style={{ perspective: '1000px' }}>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 bg-[#ff00aa] rounded-full blur-[70px] opacity-30"
      />
      
      <motion.div
        animate={{ rotateX: [60, 50, 60], rotateZ: [-45, -35, -45], y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-48 h-64 bg-[#0a0a0c] border border-[#ff00aa]/40 rounded-xl p-5 flex flex-col gap-5 shadow-[0_20px_50px_rgba(255,0,170,0.3)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Core Chip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#030305] border border-[#ff00aa] rounded-md shadow-[0_0_30px_rgba(255,0,170,0.5)] flex items-center justify-center z-10" style={{ transform: "translateZ(30px)" }}>
           <motion.div 
             animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="w-10 h-10 bg-[#ff00aa] rounded-full blur-md"
           />
           <div className="absolute inset-2 border border-[#00e5ff] rounded-sm opacity-50" />
        </div>

        {/* Traces */}
        {[...Array(8)].map((_, i) => (
           <div
             key={i}
             className="absolute bg-[#00e5ff] h-px"
             style={{
                width: `${30 + Math.random() * 40}px`,
                top: `${10 + i * 10}%`,
                left: i % 2 === 0 ? 0 : 'auto',
                right: i % 2 !== 0 ? 0 : 'auto',
                opacity: 0.5
             }}
           >
             <motion.div
               animate={{ x: i % 2 === 0 ? [0, 40] : [40, 0], opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
               className="w-2 h-full bg-white shadow-[0_0_8px_#00e5ff]"
             />
           </div>
        ))}

        {/* Small Components */}
        {[...Array(4)].map((_, i) => (
           <div
             key={i}
             className="absolute w-4 h-4 bg-[#0a0a0c] border border-[#2a2a35] rounded-sm"
             style={{
                bottom: `${10 + i * 15}%`,
                left: '10%'
             }}
           />
        ))}
      </motion.div>
    </div>
  );
}
