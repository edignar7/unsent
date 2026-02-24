import React from 'react';
import { motion } from 'framer-motion';
import { EmotionType, EMOTIONS } from '@/types/emotion';

interface EmotionChipProps {
  emotion: EmotionType;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export const EmotionChip: React.FC<EmotionChipProps> = ({ emotion, selected = false, onClick, size = 'md' }) => {
  const { emoji, displayName, color } = EMOTIONS[emotion];
  const sizeStyles = { sm: 'px-2.5 py-1 text-xs', md: 'px-3 py-1.5 text-sm' };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border-2 transition-all ${sizeStyles[size]} ${
        selected ? 'border-current' : 'border-cream-300 dark:border-charcoal-700 hover:border-current'
      }`}
      style={{ color: selected ? color : undefined, backgroundColor: selected ? `${color}20` : undefined }}
    >
      <span>{emoji}</span>
      <span className={selected ? 'font-medium' : ''}>{displayName}</span>
    </motion.button>
  );
};
