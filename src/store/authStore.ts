import { create } from 'zustand';
import { encryption } from '@/services/encryption';
import { STORAGE_KEYS } from '@/utils/constants';

interface AuthState {
  isUnlocked: boolean;
  hasPin: boolean;
  checkPin: () => void;
  setPin: (pin: string) => void;
  verifyPin: (pin: string) => boolean;
  removePin: () => void;
  unlock: () => void;
  lock: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isUnlocked: false,
  hasPin: false,

  checkPin: () => {
    const hasPin = localStorage.getItem(STORAGE_KEYS.LOCK_PIN) !== null;
    set({ hasPin });
  },

  setPin: (pin: string) => {
    const hash = encryption.hashPin(pin);
    localStorage.setItem(STORAGE_KEYS.LOCK_PIN, hash);
    set({ hasPin: true });
  },

  verifyPin: (pin: string) => {
    const storedHash = localStorage.getItem(STORAGE_KEYS.LOCK_PIN);
    if (!storedHash) return true;
    const isValid = encryption.verifyPin(pin, storedHash);
    if (isValid) set({ isUnlocked: true });
    return isValid;
  },

  removePin: () => {
    localStorage.removeItem(STORAGE_KEYS.LOCK_PIN);
    set({ hasPin: false, isUnlocked: true });
  },

  unlock: () => set({ isUnlocked: true }),
  lock: () => set({ isUnlocked: false }),
}));
