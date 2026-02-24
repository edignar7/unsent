import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Message, MessageFormData } from '@/types/message';
import { storage } from '@/services/storage';

interface MessageState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  loadMessages: () => Promise<void>;
  addMessage: (data: MessageFormData) => Promise<Message>;
  deleteMessage: (id: string) => Promise<void>;
  getMessage: (id: string) => Message | undefined;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  loadMessages: async () => {
    set({ isLoading: true, error: null });
    try {
      const messages = await storage.getAllMessages();
      set({ messages, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load messages', isLoading: false });
    }
  },

  addMessage: async (data: MessageFormData) => {
    const message: Message = {
      id: uuidv4(),
      content: data.content,
      recipientLabel: data.recipientLabel || undefined,
      emotion: data.emotion,
      audioBlob: data.audioBlob,
      audioDuration: data.audioDuration,
      createdAt: new Date().toISOString(),
      isVoiceNote: data.isVoiceNote,
    };

    await storage.saveMessage(message);
    set(state => ({ messages: [message, ...state.messages] }));
    return message;
  },

  deleteMessage: async (id: string) => {
    await storage.deleteMessage(id);
    set(state => ({ messages: state.messages.filter(m => m.id !== id) }));
  },

  getMessage: (id: string) => {
    return get().messages.find(m => m.id === id);
  },
}));
