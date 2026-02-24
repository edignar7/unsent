import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, X } from 'lucide-react';

interface VoiceRecorderProps {
  isRecording: boolean;
  recordingTime: number;
  onStart: () => void;
  onStop: () => void;
  onCancel: () => void;
}

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ isRecording, recordingTime, onStart, onStop, onCancel }) => {
  return (
    <div className="flex flex-col items-center py-8">
      {isRecording ? (
        <>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mb-4">
            <Mic className="w-10 h-10 text-white" />
          </motion.div>
          <p className="text-2xl font-mono mb-6">{formatTime(recordingTime)}</p>
          <div className="flex gap-4">
            <button onClick={onCancel} className="p-4 rounded-full bg-cream-300 dark:bg-charcoal-700">
              <X className="w-6 h-6" />
            </button>
            <button onClick={onStop} className="p-4 rounded-full bg-sage-300 text-white">
              <Square className="w-6 h-6" />
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-stone-500 mb-4">Tap to record your thoughts</p>
          <button onClick={onStart} className="w-20 h-20 rounded-full bg-sage-300 flex items-center justify-center">
            <Mic className="w-10 h-10 text-white" />
          </button>
        </>
      )}
    </div>
  );
};
