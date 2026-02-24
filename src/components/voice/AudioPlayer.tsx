import React, { useEffect, useRef } from 'react';
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
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onSeek || duration === 0) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  return (
    <div className="bg-cream-200 dark:bg-charcoal-700 rounded-2xl p-4">
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button 
          onClick={isPlaying ? onPause : onPlay} 
          className="w-12 h-12 rounded-full bg-sage-300 hover:bg-sage-400 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>

        {/* Progress Section */}
        <div className="flex-1 min-w-0">
          {/* Time Display */}
          <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Progress Bar */}
          <div 
            ref={progressRef}
            onClick={handleProgressClick}
            className="h-2 bg-cream-300 dark:bg-charcoal-600 rounded-full cursor-pointer overflow-hidden"
          >
            <div 
              className="h-full bg-sage-300 rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Progress Knob */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-sage-400 rounded-full shadow-md transform translate-x-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Waveform visualization (optional visual) */}
      <div className="flex items-center justify-center gap-1 mt-3 h-8">
        {Array.from({ length: 20 }).map((_, i) => {
          const barProgress = (i / 20) * 100;
          const isActive = barProgress <= progress;
          const height = Math.random() * 100;
          
          return (
            <div
              key={i}
              className={`w-1 rounded-full transition-colors ${
                isActive 
                  ? 'bg-sage-400' 
                  : 'bg-cream-300 dark:bg-charcoal-600'
              }`}
              style={{ height: `${20 + height * 0.6}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};
