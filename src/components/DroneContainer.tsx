import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DroneContainerProps {
  children: ReactNode;
  mode?: 'stay' | 'fly-in-out';
  contentKey?: string | number; // Used to trigger fly-in-out transitions
}

export default function DroneContainer({ children, mode = 'stay', contentKey = 'default' }: DroneContainerProps) {
  return (
    <div className={`relative w-full ${mode === 'fly-in-out' ? 'drone-delivery' : ''}`}>
      <div className="drone-float">
        <div className="flex flex-col items-center text-[var(--color-text)] transform-origin-top">
          {/* DRONE SVG */}
          <svg className="drone-svg" width="140" height="40" viewBox="0 0 240 80" fill="none"
              stroke="currentColor" strokeWidth="3" style={{ position: 'relative', zIndex: 30 }}>
              <path d="M 120 40 L 40 20 M 120 40 L 200 20" stroke="currentColor" strokeWidth="6"
                  strokeLinecap="round" />
              <ellipse cx="40" cy="15" rx="35" ry="4" className="propeller" fill="currentColor" opacity="0.7"
                  stroke="none" style={{ transformOrigin: '40px 15px' }} />
              <path d="M 40 15 L 40 5" stroke="currentColor" strokeWidth="3" />
              <ellipse cx="200" cy="15" rx="35" ry="4" className="propeller" fill="currentColor" opacity="0.7"
                  stroke="none" style={{ transformOrigin: '200px 15px' }} />
              <path d="M 200 15 L 200 5" stroke="currentColor" strokeWidth="3" />
              <rect x="100" y="32" width="40" height="16" rx="4" fill="#18181b" stroke="none" />
              <rect x="100" y="32" width="40" height="16" rx="4" />
              <circle cx="120" cy="40" r="2.5" fill="#e4e4e7" className="animate-pulse" stroke="none" />
              <path d="M 105 48 L 95 65 M 135 48 L 145 65" stroke="#71717a" strokeWidth="3"
                  strokeLinecap="round" />
          </svg>

          <div className="payload-container">
            <div style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d', width: '100%', margin: '0 auto', position: 'relative' }}>
                {/* CABLES */}
                <svg className="drone-cables"
                    style={{ width: '100%', height: '60px', overflow: 'visible', marginTop: '-10px', position: 'relative', zIndex: 20, transform: 'translateZ(1px)' }}
                    viewBox="0 0 480 60" preserveAspectRatio="none">
                    <line x1="220" y1="0" x2="10%" y2="60" stroke="currentColor" strokeWidth="2"
                        strokeDasharray="4 4" opacity="0.6" />
                    <line x1="260" y1="0" x2="90%" y2="60" stroke="currentColor" strokeWidth="2"
                        strokeDasharray="4 4" opacity="0.6" />
                </svg>

                {/* PAYLOAD */}
                <div className="w-full relative" style={{ transformStyle: 'preserve-3d', marginTop: '-10px' }}>
                    {/* Attachment Pins */}
                    <div style={{ position: 'absolute', top: 0, left: '10%', width: '12px', height: '12px', background: 'currentColor', borderRadius: '50%', zIndex: 50, transform: 'translate(-50%, -50%) translateZ(25px)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                    <div style={{ position: 'absolute', top: 0, left: '90%', width: '12px', height: '12px', background: 'currentColor', borderRadius: '50%', zIndex: 50, transform: 'translate(-50%, -50%) translateZ(25px)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>

                    {mode === 'stay' ? (
                      <div className="glass-card w-full">
                        <div className="water-droplets">
                            <div className="droplet teardrop d1"></div>
                            <div className="droplet teardrop d2"></div>
                            <div className="droplet teardrop d3"></div>
                            <div className="droplet teardrop d4"></div>
                            <div className="droplet teardrop d5"></div>
                            <div className="droplet teardrop d6"></div>
                            <div className="droplet teardrop d7"></div>
                            <div className="droplet teardrop d8"></div>
                        </div>
                        <div className="glass-content">
                          {children}
                        </div>
                      </div>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={contentKey}
                          initial={{ y: -50, scale: 0.9, opacity: 0 }}
                          animate={{ y: 0, scale: 1, opacity: 1 }}
                          exit={{ y: '50vh', rotate: 10, opacity: 0 }}
                          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                          className="glass-card w-full"
                        >
                          <div className="water-droplets">
                              <div className="droplet teardrop d1"></div>
                              <div className="droplet teardrop d2"></div>
                              <div className="droplet teardrop d3"></div>
                              <div className="droplet teardrop d4"></div>
                              <div className="droplet teardrop d5"></div>
                              <div className="droplet teardrop d6"></div>
                              <div className="droplet teardrop d7"></div>
                              <div className="droplet teardrop d8"></div>
                          </div>
                          <div className="glass-content">
                            {children}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
