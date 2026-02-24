import { useState, useRef, useCallback, useEffect } from 'react';

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: (audioSrc: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  seek: (time: number) => void;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startTimeTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        // Convert seconds to milliseconds for display
        setCurrentTime(audioRef.current.currentTime * 1000);
        
        // Also update duration in case it wasn't available initially
        if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
          setDuration(audioRef.current.duration * 1000);
        }
      }
    }, 50); // Update more frequently for smoother progress
  }, []);

  const stopTimeTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback((audioSrc: string) => {
    // Stop current audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      stopTimeTracking();
    }

    setCurrentTime(0);
    setDuration(0);

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    // Get duration when metadata is loaded
    audio.onloadedmetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration * 1000); // Convert to milliseconds
      }
    };

    // Also try to get duration when canplaythrough fires
    audio.oncanplaythrough = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration * 1000);
      }
    };

    // Handle duration change (some formats report duration late)
    audio.ondurationchange = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration * 1000);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      stopTimeTracking();
    };

    audio.onerror = (e) => {
      console.error('Error playing audio:', e);
      setIsPlaying(false);
      stopTimeTracking();
    };

    audio.play()
      .then(() => {
        setIsPlaying(true);
        startTimeTracking();
      })
      .catch((err) => {
        console.error('Failed to play audio:', err);
      });
  }, [startTimeTracking, stopTimeTracking]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopTimeTracking();
    }
  }, [stopTimeTracking]);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          startTimeTracking();
        })
        .catch((err) => {
          console.error('Failed to resume audio:', err);
        });
    }
  }, [startTimeTracking]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    stopTimeTracking();
  }, [stopTimeTracking]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      // time is in milliseconds, convert to seconds for audio element
      const timeInSeconds = time / 1000;
      audioRef.current.currentTime = timeInSeconds;
      setCurrentTime(time);
    }
  }, []);

  return { 
    isPlaying, 
    currentTime, 
    duration, 
    play, 
    pause, 
    resume,
    stop, 
    seek 
  };
}
