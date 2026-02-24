import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '@/types/message';
import { MessageCard } from './MessageCard';
import { EmptyState } from '@/components/common/EmptyState';

interface MessageListProps {
  messages: Message[];
  onMessageClick: (id: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, onMessageClick }) => {
  if (messages.length === 0) {
    return <EmptyState emoji="📝" title="No messages yet" subtitle="Your thoughts are waiting to be heard." />;
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div key={message.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
          <MessageCard message={message} onClick={() => onMessageClick(message.id)} />
        </motion.div>
      ))}
    </div>
  );
};
