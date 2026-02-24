import React from 'react';
import { motion } from 'framer-motion';

interface ReflectionCardProps {
  title: string;
  children: React.ReactNode;
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({ title, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="card"
    >
      <h3 className="text-lg font-medium mb-4 text-charcoal-800 dark:text-cream-100">{title}</h3>
      {children}
    </motion.div>
  );
};
