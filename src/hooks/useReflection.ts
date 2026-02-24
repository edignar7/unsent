import { useMemo } from 'react';
import { useMessages } from './useMessages';
import { generateReflection } from '@/utils/reflection';
import { ReflectionSummary } from '@/types/reflection';

export function useReflection(): {
  reflection: ReflectionSummary | null;
  isLoading: boolean;
} {
  const { messages, isLoading } = useMessages();

  const reflection = useMemo(() => {
    if (messages.length === 0) return null;
    return generateReflection(messages);
  }, [messages]);

  return { reflection, isLoading };
}
