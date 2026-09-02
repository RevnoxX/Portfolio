import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FadeIn from './FadeIn';

const gearItems = [
  {
    id: 'g1',
    name: 'QUANTUM_COMPILER',
    type: 'SOFTWARE_ENGINE',
    image: '💻',
    rarity: 'LEGENDARY',
    stats: { Power: 95, Speed: 88, Reliability: 99 },
    reqs: ['React', 'TypeScript', 'Node.js'],
    desc: 'High-frequency code compiler that dramatically accelerates development cycles. Reduces bundle size by 40%.',
  },
  {
    id: 'g2',
    name: 'NEURAL_UPLINK',
    type: 'API_INTERFACE',
    image: '🧠',
    rarity: 'EPIC',
    stats: { Power: 85, Speed: 92, Reliability: 80 },
    reqs: ['REST', 'GraphQL', 'WebSockets'],
    desc: 'Direct mental connection to cloud databases. Enables real-time data streaming and instant query resolution.',
  },
  {
    id: 'g3',
    name: 'CYBER_DECK_PRO',
    type: 'HARDWARE',
    image: '⌨️',
    rarity: 'RARE',
    stats: { Power: 70, Speed: 95, Reliability: 90 },
    reqs: ['Mechanical Switches', 'RGB Override'],
    desc: 'Custom-built interface deck. Increases APM (Actions Per Minute) and reduces syntax errors during high-stress encounters.',
  },
  {
    id: 'g4',
    name: 'VOID_SHIELD',
    type: 'SECURITY_PROTOCOL',
    image: '🛡️',
    rarity: 'EPIC',
    stats: { Power: 90, Speed: 60, Reliability: 100 },
    reqs: ['OAuth2', 'JWT', 'AES-256'],
    desc: 'Impenetrable authentication layer. Deflects unauthorized access attempts and neutralizes SQL injection projectiles.',
  }
];

export default function Loadout() {
  const [selectedGear, setSelectedGear] = useState<typeof gearItems[0] | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section className="mb-32 relative z-10 w-full max-w-5xl mx-auto px-4">
      <FadeIn delay={0.1} direction="up">
        <div className="mb-10 group/title relative w-max">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)] flex items-center gap-4 ml-2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--color-primary)] to-transparent block"></span>
            Active Loadout
          </h2>
          <p className="text-[10px] text-gray-500 font-medium mt-2 ml-16 uppercase tracking-widest">
            // DEVELOPER ARSENAL: Hardware and software stack
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col gap-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          {gearItems.map((item, index) => (
            <motion.div
              variants={itemVariants}
              key={item.id}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setSelectedGear(item)}
              onMouseLeave={() => setSelectedGear(null)}
              className={`glass-card p-6 cursor-pointer relative overflow-hidden transition-all duration-300 ${
                selectedGear?.id === item.id ? 'ring-2 ring-[var(--color-primary)] shadow-md bg-white/80' : 'bg-white/40 hover:bg-white/60'
              }`}
            >
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[var(--color-primary)] font-semibold text-[10px] uppercase tracking-widest bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                  {item.rarity}
                </span>
                <span className="text-gray-400 font-mono text-[10px]">0{index + 1}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center py-4 relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.image}
                </div>
                <h3 className="text-[var(--color-text)] font-bold tracking-tight text-center text-sm uppercase">
                  {item.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full min-h-[300px]">
          <AnimatePresence mode="wait">
            {selectedGear ? (
              <motion.div
                key={selectedGear.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card w-full h-full p-6 flex flex-col bg-white/70 backdrop-blur-xl"
              >
                <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-3 relative z-10">
                  <div>
                    <h3 className="text-[var(--color-primary)] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-2">
                      ITEM_DETAILS
                    </h3>
                    <h2 className="text-xl text-[var(--color-text)] font-black tracking-tight truncate">
                      {selectedGear.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Classification</div>
                    <div className="text-sm font-semibold text-[var(--color-text)] bg-white px-3 py-1 rounded-full shadow-sm">
                      {selectedGear.type}
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 py-2">
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {selectedGear.desc}
                    </p>
                    
                    <div className="mt-6">
                      <h4 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Dependencies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedGear.reqs.map(req => (
                          <span key={req} className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md font-medium shadow-sm">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4">
                    {Object.entries(selectedGear.stats).map(([stat, value]) => (
                      <div key={stat} className="w-full">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-gray-500 uppercase tracking-widest font-bold">{stat}</span>
                          <span className="text-[var(--color-primary)] font-bold">{value}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="h-full bg-[var(--color-primary)] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card w-full h-full p-8 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 bg-white/30 text-gray-400 min-h-[300px]"
              >
                <div className="text-4xl mb-4 opacity-50">📡</div>
                <p className="text-sm uppercase tracking-widest font-bold">Select gear to view telemetry</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
