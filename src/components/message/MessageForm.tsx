import React, { useState } from 'react';
import { EmotionPicker } from '@/components/emotion/EmotionPicker';
import { Button } from '@/components/common/Button';
import { EmotionType } from '@/types/emotion';
import { MessageFormData } from '@/types/message';
import { Send } from 'lucide-react';

interface MessageFormProps {
  onSubmit: (data: MessageFormData) => void;
  isLoading?: boolean;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onSubmit, isLoading }) => {
  const [content, setContent] = useState('');
  const [recipientLabel, setRecipientLabel] = useState('');
  const [emotion, setEmotion] = useState<EmotionType>('untagged');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ content, recipientLabel, emotion, isVoiceNote: false });
    setContent('');
    setRecipientLabel('');
    setEmotion('untagged');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">To (optional)</label>
        <input
          type="text"
          value={recipientLabel}
          onChange={(e) => setRecipientLabel(e.target.value)}
          placeholder="Mom, Future me, My ex..."
          className="input"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Your message</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write what you need to say..."
          className="textarea min-h-[200px]"
        />
      </div>
      <EmotionPicker selectedEmotion={emotion} onSelect={setEmotion} />
      <Button type="submit" icon={Send} fullWidth isLoading={isLoading} disabled={!content.trim()}>
        Save to Vault
      </Button>
    </form>
  );
};
