import { EmotionType, EMOTIONS, Emotion } from '@/types/emotion';

export function getEmotion(type: EmotionType): Emotion {
  return EMOTIONS[type];
}

export function getAllEmotions(): Emotion[] {
  return Object.values(EMOTIONS).filter(e => e.type !== 'untagged');
}

export function getEmotionColor(type: EmotionType): string {
  return EMOTIONS[type]?.color || EMOTIONS.untagged.color;
}

export function getEmotionEmoji(type: EmotionType): string {
  return EMOTIONS[type]?.emoji || EMOTIONS.untagged.emoji;
}
