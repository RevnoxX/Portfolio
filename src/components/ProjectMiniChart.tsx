import { motion } from 'motion/react';
import { useMemo } from 'react';

interface Props {
  projectIndex: number;
}

export default function ProjectMiniChart({ projectIndex }: Props) {
  const baseComplexity = 40 + ((projectIndex * 27) % 60);
  const baseTechUsage = 50 + ((projectIndex * 33) % 50);

  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const getOffset = (percent: number) => circumference - (percent / 100) * circumference;

  return (
    <div className="bg-[#0a0a0c]/90 backdrop-blur-md border border-[#2a2a35] p-3 rounded-md shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col items-center">
      <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mb-3 border-b border-[#2a2a35] pb-1 w-full text-center">
        SYS_METRICS
      </div>
      
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background rings */}
        <svg className="absolute inset-0 transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1a1a24"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - strokeWidth - 2}
            stroke="#1a1a24"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </svg>

        {/* Foreground animated rings */}
        <svg className="absolute inset-0 transform -rotate-90 drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]" width={size} height={size}>
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#00e5ff"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: getOffset(baseTechUsage) }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        
        <svg className="absolute inset-0 transform -rotate-90 drop-shadow-[0_0_5px_rgba(255,0,170,0.8)]" width={size} height={size}>
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius - strokeWidth - 2}
            stroke="#ff00aa"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={(radius - strokeWidth - 2) * 2 * Math.PI}
            initial={{ strokeDashoffset: (radius - strokeWidth - 2) * 2 * Math.PI }}
            whileInView={{ strokeDashoffset: ((radius - strokeWidth - 2) * 2 * Math.PI) - ((baseComplexity / 100) * ((radius - strokeWidth - 2) * 2 * Math.PI)) }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[#00e5ff] text-[8px] font-mono font-bold leading-none mb-0.5" title="Tech Usage">{baseTechUsage}%</span>
          <span className="text-[#ff00aa] text-[8px] font-mono font-bold leading-none" title="Complexity">{baseComplexity}%</span>
        </div>
      </div>
      
      <div className="flex gap-3 mt-3 w-full justify-center">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff]"></span>
          <span className="text-[8px] text-gray-400 font-mono">TECH</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#ff00aa]"></span>
          <span className="text-[8px] text-gray-400 font-mono">CPLX</span>
        </div>
      </div>
    </div>
  );
}
