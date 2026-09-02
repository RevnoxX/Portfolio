import React from 'react';
import { motion } from "motion/react";
import { playHover } from "../utils/audio";

interface SkillBadgeProps {
  skill: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  variants?: any;
  key?: React.Key | number | string;
}

export default function SkillBadge({ skill, onMouseEnter, onMouseLeave, variants }: SkillBadgeProps) {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => {
        playHover();
        onMouseEnter();
      }}
      onMouseLeave={onMouseLeave}
      className="bg-[#030305] border border-[#00e5ff] text-[#00e5ff] text-xs px-4 py-2 rounded-sm cursor-pointer transition-colors relative overflow-hidden group/badge shadow-sm"
    >
      <div className="absolute inset-0 bg-[#00e5ff]/10 translate-x-0 transition-transform duration-300" />
      <span className="relative z-10">{skill}</span>
    </motion.li>
  );
}
