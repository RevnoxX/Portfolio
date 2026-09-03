import { motion } from "motion/react";
import ScrambleText from "./ScrambleText";

export default function ExitModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-2xl overflow-hidden"
    >
      {/* Subtle light glitch background lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay flex flex-col justify-between">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full h-[1px] bg-gray-400"
            animate={{ 
              opacity: [0, 0.5, 0],
              scaleX: [1, 1.05, 1],
              x: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{ 
              duration: 0.1 + Math.random() * 0.3, 
              repeat: Infinity,
              repeatType: "mirror",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div
        animate={{ 
          x: [-1, 1, -0.5, 0.5, 0],
          y: [0.5, -0.5, 1, -1, 0],
        }}
        transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
        className="text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-black text-[var(--color-text)] mb-4 tracking-tighter">
          <ScrambleText text="SESSION CLOSED" delay={0.2} />
        </h2>
        
        <p className="text-gray-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-12">
          Thank you for visiting
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[#c96c53] transition-colors uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Return
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
