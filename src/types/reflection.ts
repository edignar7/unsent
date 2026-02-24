import { EmotionType } from './emotion';

export interface EmotionFrequency {
  emotion: EmotionType;
  count: number;
  percentage: number;
}

export interface EmotionalShift {
  fromEmotion: EmotionType;
  toEmotion: EmotionType;
  observation: string;
}

export interface WritingPattern {
  title: string;
  description: string;
}

export interface ReflectionSummary {
  totalMessages: number;
  emotionFrequency: EmotionFrequency[];
  mostFrequentEmotion?: EmotionType;
  frequentRecipients: string[];
  writingPatterns: WritingPattern[];
  emotionalShifts: EmotionalShift[];
  periodStart: string;
  periodEnd: string;
  isAvailable: boolean;
  daysUntilAvailable?: number;
}
