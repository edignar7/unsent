export const APP_NAME = 'Unsent';

export const STORAGE_KEYS = {
  MESSAGES: 'unsent_messages',
  SETTINGS: 'unsent_settings',
  LOCK_PIN: 'unsent_lock_pin',
  FIRST_LAUNCH: 'unsent_first_launch',
} as const;

export const REFLECTION_MIN_DAYS = 30;
export const REFLECTION_MIN_MESSAGES = 5;

export const GENTLE_MESSAGES = {
  welcome: "This is your private space. No one else will see what you write here.",
  empty: "Your thoughts are waiting to be heard.",
  saved: "Your words are safe here.",
  deleted: "Let go of what no longer serves you.",
  reflectionLocked: "Reflection becomes available after 30 days of writing.",
} as const;
