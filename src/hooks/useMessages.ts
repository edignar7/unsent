import { useEffect } from 'react';
import { useMessageStore } from '@/store/messageStore';

export function useMessages() {
  const { messages, isLoading, error, loadMessages } = useMessageStore();

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return { messages, isLoading, error };
}
