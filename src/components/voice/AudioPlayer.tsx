import React, { useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  onPlay: () => void;
  onPause: () => void;
  onSeek?: (time: number) => void;
}

const formatTime = (ms: number): string => {
  if (!ms || !isFinite(ms) || isNaN(ms)) return '0:00';
  
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  isPlaying, 
  duration, 
  currentTime, 
  onPlay, 
  onPause,
  onSeek 
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  
  const progress = (duration > 0 && isFinite(duration)) 
    ? Math.min((currentTime / duration) * 100, 100) 
    : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onSeek || !duration || duration === 0) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  return (
    <div className="bg-cream-200 dark:bg-charcoal-700 rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={isPlaying ? onPause : onPlay} 
          className="w-14 h-14 rounded-full bg-sage-300 hover:bg-sage-400 flex items-center justify-center flex-shrink-0 transition-colors shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 text-white" />
          ) : (
            <Play className="w-7 h-7 text-white ml-1" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div 
            ref={progressRef}
            onClick={handleProgressClick}
            className="h-3 bg-cream-300 dark:bg-charcoal-600 rounded-full cursor-pointer overflow-hidden mb-2"
          >
            <div 
              className="h-full bg-sage-300 rounded-full relative"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            >
              {duration > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-sage-400 rounded-full shadow-md transform translate-x-1/2 border-2 border-white" />
              )}
            </div>
          </div>

          <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400">
            <span className="font-mono">{formatTime(currentTime)}</span>
            <span className="font-mono">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
