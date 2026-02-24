export type EmotionType =
  | 'anger'
  | 'grief'
  | 'love'
  | 'regret'
  | 'relief'
  | 'fear'
  | 'hope'
  | 'confusion'
  | 'gratitude'
  | 'longing'
  | 'peace'
  | 'untagged';

export interface Emotion {
  type: EmotionType;
  displayName: string;
  emoji: string;
  color: string;
}

export const EMOTIONS: Record<EmotionType, Emotion> = {
  anger: { type: 'anger', displayName: 'Anger', emoji: '🔥', color: '#E57373' },
  grief: { type: 'grief', displayName: 'Grief', emoji: '💔', color: '#9575CD' },
  love: { type: 'love', displayName: 'Love', emoji: '💕', color: '#F48FB1' },
  regret: { type: 'regret', displayName: 'Regret', emoji: '🌧️', color: '#90A4AE' },
  relief: { type: 'relief', displayName: 'Relief', emoji: '🌿', color: '#81C784' },
  fear: { type: 'fear', displayName: 'Fear', emoji: '🌑', color: '#7986CB' },
  hope: { type: 'hope', displayName: 'Hope', emoji: '🌅', color: '#FFD54F' },
  confusion: { type: 'confusion', displayName: 'Confusion', emoji: '🌀', color: '#4DD0E1' },
  gratitude: { type: 'gratitude', displayName: 'Gratitude', emoji: '✨', color: '#FFB74D' },
  longing: { type: 'longing', displayName: 'Longing', emoji: '🌙', color: '#B39DDB' },
  peace: { type: 'peace', displayName: 'Peace', emoji: '🕊️', color: '#A5D6A7' },
  untagged: { type: 'untagged', displayName: 'Untagged', emoji: '📝', color: '#BDBDBD' },
};
