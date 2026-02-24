import { useState, useRef, useCallback } from 'react';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  recordingTime: number;
  audioBlob: Blob | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  cancelRecording: () => void;
  resetRecording: () => void;
  error: string | null;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    setError(null);
    
    try {
      let combinedStream: MediaStream;

      // Try to get display audio (system sounds) + microphone
      try {
        // Request screen/system audio
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: false, // We don't need video
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
            // @ts-ignore - these are valid but not in TypeScript types
            suppressLocalAudioPlayback: false,
          }
        });

        // Request microphone
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          }
        });

        // Combine both audio streams
        const audioContext = new AudioContext();
        const destination = audioContext.createMediaStreamDestination();

        // Add display audio tracks
        const displayAudioTracks = displayStream.getAudioTracks();
        if (displayAudioTracks.length > 0) {
          const displaySource = audioContext.createMediaStreamSource(
            new MediaStream(displayAudioTracks)
          );
          displaySource.connect(destination);
        }

        // Add microphone tracks
        const micSource = audioContext.createMediaStreamSource(micStream);
        micSource.connect(destination);

        combinedStream = destination.stream;

        // Store streams for cleanup
        streamRef.current = new MediaStream([
          ...displayStream.getTracks(),
          ...micStream.getTracks(),
          ...combinedStream.getTracks()
        ]);

        console.log('Recording with system audio + microphone');

      } catch (displayError) {
        // Fallback: If system audio capture fails, use microphone only with all sounds
        console.log('System audio not available, using microphone only');
        
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,      // Don't cancel echo - capture everything
            noiseSuppression: false,      // Don't suppress noise - capture everything
            autoGainControl: false,       // Don't auto-adjust - capture raw audio
            // @ts-ignore
            googEchoCancellation: false,
            googAutoGainControl: false,
            googNoiseSuppression: false,
            googHighpassFilter: false,
          }
        });

        combinedStream = micStream;
        streamRef.current = micStream;
      }

      // Determine best supported format
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
        'audio/mpeg',
      ];

      let selectedMimeType = '';
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: selectedMimeType || undefined,
        audioBitsPerSecond: 128000,
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError('Recording error occurred');
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 100);
      }, 100);

    } catch (err) {
      console.error('Failed to start recording:', err);
      setError('Could not access microphone. Please check permissions.');
    }
  }, []);

  const stopRecording = useCallback(async () => {
    return new Promise<void>((resolve) => {
      if (!mediaRecorderRef.current) {
        resolve();
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);

        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }

        resolve();
      };

      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    });
  }, []);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }

    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRecording(false);
    setRecordingTime(0);
    setAudioBlob(null);
    chunksRef.current = [];
  }, [isRecording]);

  const resetRecording = useCallback(() => {
    setAudioBlob(null);
    setRecordingTime(0);
    setError(null);
  }, []);

  return {
    isRecording,
    recordingTime,
    audioBlob,
    startRecording,
    stopRecording,
    cancelRecording,
    resetRecording,
    error,
  };
}
