import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MessageDetail } from '@/components/message/MessageDetail';
import { AudioPlayer } from '@/components/voice/AudioPlayer';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useMessageStore } from '@/store/messageStore';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Message } from '@/types/message';

export const MessageView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMessage, deleteMessage, loadMessages } = useMessageStore();
  const [message, setMessage] = useState<Message | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isPlaying, currentTime, duration, play, pause, resume, seek } = useAudioPlayer();
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  useEffect(() => {
    const load = async () => {
      await loadMessages();
      if (id) setMessage(getMessage(id) || null);
      setIsLoading(false);
    };
    load();
  }, [id, getMessage, loadMessages]);

  const handleDelete = async () => {
    if (id) { 
      await deleteMessage(id); 
      navigate('/vault'); 
    }
  };

  const handlePlayPause = () => {
    if (!message?.audioBlob) return;
    
    if (isPlaying) {
      pause();
    } else if (hasStartedPlaying) {
      resume();
    } else {
      play(message.audioBlob);
      setHasStartedPlaying(true);
    }
  };

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!message) {
    return (
      <div className="page-container">
        <Header title="Message" showBack />
        <p className="text-center text-stone-500 mt-12">Message not found</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header 
        title="Message" 
        showBack 
        rightAction={
          <button 
            onClick={() => setShowDeleteConfirm(true)} 
            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        } 
      />
      
      <div className="mt-6">
        {message.isVoiceNote && message.audioBlob && (
          <div className="mb-6">
            <AudioPlayer 
              isPlaying={isPlaying} 
              currentTime={currentTime} 
              duration={message.audioDuration || duration} 
              onPlay={handlePlayPause} 
              onPause={handlePlayPause}
              onSeek={seek}
            />
          </div>
        )}
        <MessageDetail message={message} />
      </div>
      
      <ConfirmDialog 
        isOpen={showDeleteConfirm} 
        onClose={() => setShowDeleteConfirm(false)} 
        onConfirm={handleDelete} 
        title="Delete Message" 
        message="This message will be permanently deleted." 
        confirmText="Delete" 
        variant="danger" 
      />
    </div>
  );
};
