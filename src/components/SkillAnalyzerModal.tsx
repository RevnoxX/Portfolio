import { motion, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { playClick } from '../utils/audio';

interface Props {
  isOpen: boolean;
  skill: string | null;
  onClose: () => void;
}

export default function SkillAnalyzerModal({ isOpen, skill, onClose }: Props) {
  
  // Generate semi-random stats based on string length to look realistic
  const generateData = (seed: string) => {
    if (!seed) return [];
    const base = seed.length;
    return [
      { subject: 'Complexity', A: Math.min(60 + base * 5, 95), fullMark: 100 },
      { subject: 'Efficiency', A: Math.min(50 + base * 4, 98), fullMark: 100 },
      { subject: 'Syntax', A: Math.min(70 + base * 3, 100), fullMark: 100 },
      { subject: 'Architecture', A: Math.min(40 + base * 6, 90), fullMark: 100 },
      { subject: 'Logic', A: Math.min(55 + base * 2, 95), fullMark: 100 },
      { subject: 'Tooling', A: Math.min(65 + base * 4, 90), fullMark: 100 },
    ];
  };

  const data = generateData(skill || '');

  return (
    <AnimatePresence>
      {isOpen && skill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed right-6 top-24 z-[99999] flex items-center justify-center p-4 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.9, x: 50, opacity: 0 }}
            animate={{ scale: 1, x: 0, opacity: 1 }}
            exit={{ scale: 0.9, x: 50, opacity: 0 }}
            className="bg-[#030305] backdrop-blur-md border border-[#00e5ff] w-full max-w-[280px] p-4 rounded-sm shadow-[0_0_30px_rgba(0,229,255,0.2)]"
          >
            <div className="flex justify-between items-start mb-4 border-b border-[#00e5ff]/30 pb-3">
              <div>
                <h3 className="text-[#00e5ff] text-[10px] uppercase font-bold tracking-widest mb-1">Skill Analysis</h3>
                <h2 className="text-lg text-white font-mono font-black truncate">{skill}</h2>
              </div>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="55%" data={data}>
                  <PolarGrid stroke="#2a2a35" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#00e5ff', fontSize: 10, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Skill" dataKey="A" stroke="#ff00aa" fill="#ff00aa" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 pt-3 border-t border-[#00e5ff]/30 text-center">
              <p className="text-[#ff00aa] text-[9px] font-mono uppercase tracking-widest animate-pulse">
                Analysis Complete // Systems Nominal
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
