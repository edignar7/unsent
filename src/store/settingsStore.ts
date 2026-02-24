import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  lockEnabled: boolean;
  reflectionDays: number;
  hasCompletedOnboarding: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLockEnabled: (enabled: boolean) => void;
  setReflectionDays: (days: number) => void;
  completeOnboarding: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      lockEnabled: false,
      reflectionDays: 30,
      hasCompletedOnboarding: false,
      setTheme: (theme) => set({ theme }),
      setLockEnabled: (enabled) => set({ lockEnabled: enabled }),
      setReflectionDays: (days) => set({ reflectionDays: days }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    { name: 'unsent-settings' }
  )
);
