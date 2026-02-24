import React from 'react';
import { motion } from 'framer-motion';
import { EmotionFrequency } from '@/types/reflection';
import { EMOTIONS } from '@/types/emotion';

interface EmotionStatsProps {
  data: EmotionFrequency[];
}

export const EmotionStats: React.FC<EmotionStatsProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count));
  return (
    <div className="space-y-3">
      {data.slice(0, 5).map((item, index) => {
        const emotion = EMOTIONS[item.emotion];
        const percentage = (item.count / maxCount) * 100;
        return (
          <motion.div key={item.emotion} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <span>{emotion.emoji}</span>
                <span>{emotion.displayName}</span>
              </span>
              <span className="text-stone-500">{item.percentage}%</span>
            </div>
            <div className="h-2 bg-cream-300 dark:bg-charcoal-700 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.5, delay: index * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: emotion.color }} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
