import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, Mic } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MessageForm } from '@/components/message/MessageForm';
import { VoiceRecorder } from '@/components/voice/VoiceRecorder';
import { EmotionPicker } from '@/components/emotion/EmotionPicker';
import { Button } from '@/components/common/Button';
import { useMessageStore } from '@/store/messageStore';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { EmotionType } from '@/types/emotion';

type Mode = 'text' | 'voice';

export const Compose: React.FC = () => {
  const navigate = useNavigate();
  const { addMessage } = useMessageStore();
  const [mode, setMode] = useState<Mode>('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipientLabel, setRecipientLabel] = useState('');
  const [emotion, setEmotion] = useState<EmotionType>('untagged');
  
  const { isRecording, recordingTime, audioBlob, startRecording, stopRecording, cancelRecording, resetRecording } = useAudioRecorder();

  const handleTextSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await addMessage(data);
      navigate('/vault');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoiceSubmit = async () => {
    if (!audioBlob) return;
    setIsSubmitting(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        await addMessage({
          content: '',
          recipientLabel,
          emotion,
          audioBlob: reader.result as string,
          audioDuration: recordingTime,
          isVoiceNote: true,
        });
        navigate('/vault');
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <Header title="Write" showBack />
      <div className="flex gap-2 mb-6">
        <Button onClick={() => setMode('text')} variant={mode === 'text' ? 'primary' : 'secondary'} icon={Keyboard} size="sm">Text</Button>
        <Button onClick={() => setMode('voice')} variant={mode === 'voice' ? 'primary' : 'secondary'} icon={Mic} size="sm">Voice</Button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'text' ? (
          <motion.div key="text" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <MessageForm onSubmit={handleTextSubmit} isLoading={isSubmitting} />
          </motion.div>
        ) : (
          <motion.div key="voice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">To (optional)</label>
              <input type="text" value={recipientLabel} onChange={(e) => setRecipientLabel(e.target.value)} placeholder="Mom, Future me, My ex..." className="input" />
            </div>
            <VoiceRecorder isRecording={isRecording} recordingTime={recordingTime} onStart={startRecording} onStop={stopRecording} onCancel={cancelRecording} />
            {audioBlob && !isRecording && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <EmotionPicker selectedEmotion={emotion} onSelect={setEmotion} />
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={resetRecording} fullWidth>Re-record</Button>
                  <Button onClick={handleVoiceSubmit} isLoading={isSubmitting} fullWidth>Save to Vault</Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
