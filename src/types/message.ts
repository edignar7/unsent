import { EmotionType } from './emotion';

export interface Message {
  id: string;
  content: string;
  recipientLabel?: string;
  emotion: EmotionType;
  audioBlob?: string;
  audioDuration?: number;
  createdAt: string;
  isVoiceNote: boolean;
}

export interface MessageFormData {
  content: string;
  recipientLabel: string;
  emotion: EmotionType;
  audioBlob?: string;
  audioDuration?: number;
  isVoiceNote: boolean;
}

export type MessageSortOption = 'newest' | 'oldest' | 'emotion';
export type MessageFilterOption = EmotionType | 'all';
