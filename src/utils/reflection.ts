import { Message } from '@/types/message';
import { EmotionType } from '@/types/emotion';
import { ReflectionSummary, EmotionFrequency, WritingPattern } from '@/types/reflection';
import { REFLECTION_MIN_DAYS, REFLECTION_MIN_MESSAGES } from './constants';
import { getDaysSince, getHourOfDay, getTimeOfDay } from './date';

export function generateReflection(messages: Message[]): ReflectionSummary {
  const now = new Date().toISOString();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - REFLECTION_MIN_DAYS);

  const eligibleMessages = messages.filter(
    m => new Date(m.createdAt) >= cutoffDate
  );

  const oldestMessage = messages.length > 0
    ? messages.reduce((a, b) => 
        new Date(a.createdAt) < new Date(b.createdAt) ? a : b
      )
    : null;

  const daysSinceFirst = oldestMessage ? getDaysSince(oldestMessage.createdAt) : 0;
  const isAvailable = daysSinceFirst >= REFLECTION_MIN_DAYS && 
                      messages.length >= REFLECTION_MIN_MESSAGES;

  if (!isAvailable) {
    return {
      totalMessages: messages.length,
      emotionFrequency: [],
      frequentRecipients: [],
      writingPatterns: [],
      emotionalShifts: [],
      periodStart: cutoffDate.toISOString(),
      periodEnd: now,
      isAvailable: false,
      daysUntilAvailable: Math.max(0, REFLECTION_MIN_DAYS - daysSinceFirst),
    };
  }

  const emotionCounts = new Map<EmotionType, number>();
  eligibleMessages.forEach(m => {
    emotionCounts.set(m.emotion, (emotionCounts.get(m.emotion) || 0) + 1);
  });

  const emotionFrequency: EmotionFrequency[] = Array.from(emotionCounts.entries())
    .map(([emotion, count]) => ({
      emotion,
      count,
      percentage: Math.round((count / eligibleMessages.length) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const mostFrequentEmotion = emotionFrequency[0]?.emotion;

  const recipientCounts = new Map<string, number>();
  eligibleMessages.forEach(m => {
    if (m.recipientLabel) {
      recipientCounts.set(m.recipientLabel, (recipientCounts.get(m.recipientLabel) || 0) + 1);
    }
  });

  const frequentRecipients = Array.from(recipientCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);

  const writingPatterns = analyzeWritingPatterns(eligibleMessages);

  return {
    totalMessages: eligibleMessages.length,
    emotionFrequency,
    mostFrequentEmotion,
    frequentRecipients,
    writingPatterns,
    emotionalShifts: [],
    periodStart: cutoffDate.toISOString(),
    periodEnd: now,
    isAvailable: true,
  };
}

function analyzeWritingPatterns(messages: Message[]): WritingPattern[] {
  const patterns: WritingPattern[] = [];
  if (messages.length < 3) return patterns;

  const hourCounts = new Map<number, number>();
  messages.forEach(m => {
    const hour = getHourOfDay(m.createdAt);
    hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
  });

  const mostActiveHour = Array.from(hourCounts.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  if (mostActiveHour !== undefined) {
    const timeOfDay = getTimeOfDay(mostActiveHour);
    patterns.push({
      title: 'Writing Time',
      description: `You tend to write most during the ${timeOfDay}.`,
    });
  }

  const voiceCount = messages.filter(m => m.isVoiceNote).length;
  const voicePercentage = Math.round((voiceCount / messages.length) * 100);

  if (voicePercentage > 30) {
    patterns.push({
      title: 'Voice Expression',
      description: `You often choose to record your thoughts (${voicePercentage}% of messages).`,
    });
  }

  return patterns;
}
