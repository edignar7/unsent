import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ emoji, title, subtitle, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <span className="text-6xl mb-6">{emoji}</span>
      <h3 className="text-xl font-medium text-charcoal-800 dark:text-cream-100 mb-2">{title}</h3>
      <p className="text-stone-500 dark:text-stone-400 mb-6 max-w-xs">{subtitle}</p>
      {action}
    </motion.div>
  );
};
