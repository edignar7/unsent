import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { Message } from '@/types/message';
import { EMOTIONS } from '@/types/emotion';
import { formatMessageDate, formatMessageTime } from '@/utils/date';

interface MessageCardProps {
  message: Message;
  onClick: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, onClick }) => {
  const emotion = EMOTIONS[message.emotion];
  const preview = message.isVoiceNote ? null : message.content.length > 150 ? message.content.substring(0, 150) + '...' : message.content;

  return (
    <motion.article whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={onClick} className="card-interactive">
      <div className="flex items-center justify-between mb-3">
        {message.recipientLabel ? <span className="text-sm text-sage-400 font-medium">To: {message.recipientLabel}</span> : <span />}
        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${emotion.color}20`, color: emotion.color }}>
          {emotion.emoji} {emotion.displayName}
        </span>
      </div>
      {message.isVoiceNote ? (
        <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
          <Mic className="w-5 h-5 text-sage-400" />
          <span>Voice note</span>
        </div>
      ) : (
        <p className="text-charcoal-800 dark:text-cream-100">{preview}</p>
      )}
      <p className="text-xs text-stone-500 mt-3">{formatMessageDate(message.createdAt)} at {formatMessageTime(message.createdAt)}</p>
    </motion.article>
  );
};
