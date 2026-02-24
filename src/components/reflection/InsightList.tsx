import React from 'react';
import { WritingPattern } from '@/types/reflection';

interface InsightListProps {
  insights: WritingPattern[];
}

export const InsightList: React.FC<InsightListProps> = ({ insights }) => {
  if (insights.length === 0) return null;
  
  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <div key={index} className="p-4 bg-cream-200 dark:bg-charcoal-700 rounded-xl">
          <h4 className="font-medium text-charcoal-800 dark:text-cream-100 mb-1">{insight.title}</h4>
          <p className="text-sm text-stone-500 dark:text-stone-400">{insight.description}</p>
        </div>
      ))}
    </div>
  );
};
