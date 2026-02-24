import React from 'react';
import { EmotionChip } from './EmotionChip';
import { EmotionType, EMOTIONS } from '@/types/emotion';

interface EmotionPickerProps {
  selectedEmotion: EmotionType;
  onSelect: (emotion: EmotionType) => void;
}

export const EmotionPicker: React.FC<EmotionPickerProps> = ({ selectedEmotion, onSelect }) => {
  const emotions = Object.values(EMOTIONS).filter((e) => e.type !== 'untagged');
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">How are you feeling?</label>
      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => (
          <EmotionChip
            key={emotion.type}
            emotion={emotion.type}
            selected={selectedEmotion === emotion.type}
            onClick={() => onSelect(emotion.type)}
          />
        ))}
      </div>
    </div>
  );
};
