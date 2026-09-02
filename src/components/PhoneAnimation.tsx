import { motion } from "motion/react";

export default function PhoneAnimation() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center" style={{ perspective: '1000px' }}>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 bg-[#00e5ff] rounded-full blur-[70px] opacity-30"
      />
      
      <motion.div
        animate={{ rotateY: [-15, 15, -15], rotateX: [10, 5, 10], y: [-15, 15, -15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-48 h-[360px] bg-black rounded-[2.5rem] border-[4px] border-[#0a0a0c] p-1 shadow-[0_20px_50px_rgba(0,229,255,0.3)] overflow-visible"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-full h-full rounded-[2.2rem] bg-[#0a0a0c] overflow-hidden relative border border-white/10">
           {/* Screen Gradient */}
           <motion.div 
             animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/20 to-[#ff00aa]/20"
             style={{ backgroundSize: "200% 200%" }}
           />

           {/* Floating UI Cards */}
           {[0, 1, 2].map((_, i) => (
             <motion.div
               key={i}
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
               className="mx-4 mt-8 h-16 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center p-3 gap-3"
             >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#ff00aa]" />
                <div className="flex-1 space-y-2">
                   <div className="h-2 w-full bg-white/20 rounded-full" />
                   <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                </div>
             </motion.div>
           ))}
        </div>

        {/* 3D Floating elements popping out of the screen */}
        {[...Array(3)].map((_, i) => (
           <motion.div
             key={i}
             animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
             className="absolute w-12 h-12 bg-gradient-to-tr from-[#00e5ff] to-[#ff00aa] rounded-xl shadow-2xl flex items-center justify-center font-bold text-white text-[10px] border border-white/20 uppercase tracking-widest"
             style={{ 
               top: `${20 + i * 25}%`,
               right: -20,
               transform: "translateZ(40px)"
             }}
           >
             App
           </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
