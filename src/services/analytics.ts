import { Message } from '@/types/message';
import { EmotionType } from '@/types/emotion';

export const analytics = {
  getEmotionDistribution(messages: Message[]): Map<EmotionType, number> {
    const distribution = new Map<EmotionType, number>();
    messages.forEach(m => {
      distribution.set(m.emotion, (distribution.get(m.emotion) || 0) + 1);
    });
    return distribution;
  },

  getWritingFrequency(messages: Message[]): { date: string; count: number }[] {
    const frequency = new Map<string, number>();
    messages.forEach(m => {
      const date = m.createdAt.split('T')[0];
      frequency.set(date, (frequency.get(date) || 0) + 1);
    });
    return Array.from(frequency.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },
};
