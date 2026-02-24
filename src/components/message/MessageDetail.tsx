import React from 'react';
import { Message } from '@/types/message';
import { EMOTIONS } from '@/types/emotion';
import { formatMessageDate, formatMessageTime } from '@/utils/date';

interface MessageDetailProps {
  message: Message;
}

export const MessageDetail: React.FC<MessageDetailProps> = ({ message }) => {
  const emotion = EMOTIONS[message.emotion];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {message.recipientLabel && <span className="text-sage-400 font-medium">To: {message.recipientLabel}</span>}
        <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${emotion.color}20`, color: emotion.color }}>
          {emotion.emoji} {emotion.displayName}
        </span>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      <p className="text-sm text-stone-500">{formatMessageDate(message.createdAt)} at {formatMessageTime(message.createdAt)}</p>
    </div>
  );
};
