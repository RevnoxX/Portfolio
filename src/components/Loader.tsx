import { motion } from "motion/react";
import React, { useEffect } from "react";

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030305]"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative flex flex-col items-center w-full max-w-md px-8">
        
        {/* Terminal Window Frame */}
        <div className="w-full bg-[#0a0a0c] border border-[#0a0a0c] rounded-lg p-6 shadow-2xl relative overflow-hidden">
          {/* Header dots */}
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <motion.div
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="text-gray-400"
            >
              $ INITIALIZING_SECURE_CONNECTION...
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
               className="text-[#ff00aa]"
            >
              &gt; MOUNTING_COMPONENT_TREE [OK]
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.9 }}
               className="text-[#00e5ff]"
            >
              &gt; DECRYPTING_PORTFOLIO_ASSETS [OK]
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1.4 }}
               className="text-white flex items-center gap-2 mt-4"
            >
              <span className="text-[#00e5ff]">root@system:~#</span>
              <span>LAUNCH_SEQUENCE_INITIATED</span>
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-white inline-block ml-1 align-middle"
              />
            </motion.div>
          </div>
          
          {/* Loading Bar at bottom of terminal */}
          <div className="absolute bottom-0 left-0 h-1 bg-[#0a0a0c] w-full">
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#00e5ff] to-[#ff00aa]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Loader;
