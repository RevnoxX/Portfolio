import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  label: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  const displayValue = useTransform(springValue, (current) => 
    Math.round(current).toLocaleString()
  );

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4 bg-[#0a0a0c] border border-[#0a0a0c] rounded-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-[#00e5ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.span className="text-3xl md:text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        {displayValue}
      </motion.span>
      <span className="text-[10px] uppercase tracking-widest font-bold text-[#00e5ff] mt-2 group-hover:text-[#ff00aa] transition-colors">
        {label}
      </span>
    </div>
  );
}
