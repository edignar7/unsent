import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MessageList } from '@/components/message/MessageList';
import { EmotionChip } from '@/components/emotion/EmotionChip';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useMessages } from '@/hooks/useMessages';
import { EmotionType, EMOTIONS } from '@/types/emotion';

export const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { messages, isLoading } = useMessages();
  const [filterEmotion, setFilterEmotion] = useState<EmotionType | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredMessages = filterEmotion === 'all' ? messages : messages.filter((m) => m.emotion === filterEmotion);

  if (isLoading) {
    return <div className="page-container flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="page-container">
      <Header title="Vault" showBack rightAction={
        <button onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-full transition-colors ${showFilters ? 'bg-sage-300/20 text-sage-400' : 'hover:bg-cream-300 dark:hover:bg-charcoal-700'}`}>
          <Filter className="w-5 h-5" />
        </button>
      } />

      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 overflow-hidden">
          <div className="flex flex-wrap gap-2">
            <EmotionChip emotion="untagged" selected={filterEmotion === 'all'} onClick={() => setFilterEmotion('all')} size="sm" />
            {Object.values(EMOTIONS).filter((e) => e.type !== 'untagged').map((emotion) => (
              <EmotionChip key={emotion.type} emotion={emotion.type} selected={filterEmotion === emotion.type} onClick={() => setFilterEmotion(emotion.type)} size="sm" />
            ))}
          </div>
        </motion.div>
      )}

      <p className="text-sm text-stone-500 mb-4">{filteredMessages.length} {filteredMessages.length === 1 ? 'message' : 'messages'}</p>
      <MessageList messages={filteredMessages} onMessageClick={(id) => navigate(`/message/${id}`)} />
    </div>
  );
};
