import { useCallback } from 'react';
import { encryption } from '@/services/encryption';

export function useEncryption() {
  const encrypt = useCallback((data: string) => {
    return encryption.encrypt(data);
  }, []);

  const decrypt = useCallback((encryptedData: string) => {
    return encryption.decrypt(encryptedData);
  }, []);

  return { encrypt, decrypt };
}
