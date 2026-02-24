import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ReflectionCard } from '@/components/reflection/ReflectionCard';
import { EmotionStats } from '@/components/emotion/EmotionStats';
import { InsightList } from '@/components/reflection/InsightList';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useReflection } from '@/hooks/useReflection';
import { EMOTIONS } from '@/types/emotion';

export const Reflection: React.FC = () => {
  const { reflection, isLoading } = useReflection();

  if (isLoading) return <div className="page-container flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /></div>;
  if (!reflection || reflection.totalMessages === 0) return <div className="page-container"><Header title="Reflection" showBack /><EmptyState emoji="🌱" title="Your reflection is growing" subtitle="Start writing to unlock insights about your emotional patterns." /></div>;

  if (!reflection.isAvailable) {
    return (
      <div className="page-container">
        <Header title="Reflection" showBack />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-cream-300 dark:bg-charcoal-700 flex items-center justify-center mb-6"><Lock className="w-10 h-10 text-stone-400" /></div>
          <h3 className="text-xl font-medium mb-2">Reflection Locked</h3>
          <p className="text-stone-500 max-w-xs mb-4">Reflection becomes available after 30 days of writing.</p>
          <p className="text-sm text-sage-400">{reflection.daysUntilAvailable} days remaining</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header title="Reflection" showBack />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-stone-500 mb-6">Based on {reflection.totalMessages} messages over the last 30 days</motion.p>
      <div className="space-y-6">
        {reflection.emotionFrequency.length > 0 && <ReflectionCard title="Emotional Patterns"><EmotionStats data={reflection.emotionFrequency} /></ReflectionCard>}
        {reflection.mostFrequentEmotion && (
          <ReflectionCard title="Dominant Emotion">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{EMOTIONS[reflection.mostFrequentEmotion].emoji}</span>
              <div><p className="font-medium">{EMOTIONS[reflection.mostFrequentEmotion].displayName}</p><p className="text-sm text-stone-500">appears most frequently</p></div>
            </div>
          </ReflectionCard>
        )}
        {reflection.frequentRecipients.length > 0 && (
          <ReflectionCard title="Who You Write To">
            <div className="flex flex-wrap gap-2">{reflection.frequentRecipients.map((r) => <span key={r} className="px-3 py-1 bg-cream-300 dark:bg-charcoal-700 rounded-full text-sm">{r}</span>)}</div>
          </ReflectionCard>
        )}
        {reflection.writingPatterns.length > 0 && <ReflectionCard title="Observations"><InsightList insights={reflection.writingPatterns} /></ReflectionCard>}
      </div>
      <p className="text-center text-xs text-stone-400 mt-8">These insights are descriptive, not prescriptive.<br />This app does not replace professional support.</p>
    </div>
  );
};
