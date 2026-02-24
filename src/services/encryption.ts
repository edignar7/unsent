import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY_STORAGE = 'unsent_encryption_key';

function getOrCreateKey(): string {
  let key = localStorage.getItem(ENCRYPTION_KEY_STORAGE);
  if (!key) {
    key = CryptoJS.lib.WordArray.random(256 / 8).toString();
    localStorage.setItem(ENCRYPTION_KEY_STORAGE, key);
  }
  return key;
}

export const encryption = {
  encrypt(data: string): string {
    const key = getOrCreateKey();
    return CryptoJS.AES.encrypt(data, key).toString();
  },

  decrypt(encryptedData: string): string {
    const key = getOrCreateKey();
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  },

  hashPin(pin: string): string {
    return CryptoJS.SHA256(pin).toString();
  },

  verifyPin(pin: string, hash: string): boolean {
    return CryptoJS.SHA256(pin).toString() === hash;
  },
};
