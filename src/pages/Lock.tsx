import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Delete } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface LockProps { onUnlock: () => void; }

export const LockScreen: React.FC<LockProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const { verifyPin, hasPin, setPin: savePin } = useAuthStore();
  const [isSettingPin, setIsSettingPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState('');

  useEffect(() => { if (!hasPin) setIsSettingPin(true); }, [hasPin]);

  const handleNumberPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);
      if (newPin.length === 4) {
        if (isSettingPin) {
          if (!confirmPin) { setConfirmPin(newPin); setPin(''); }
          else if (confirmPin === newPin) { savePin(newPin); onUnlock(); }
          else { setError(true); setConfirmPin(''); setPin(''); }
        } else {
          if (verifyPin(newPin)) onUnlock();
          else { setError(true); setPin(''); }
        }
      }
    }
  };

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 flex flex-col items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center mb-12">
        <div className="w-20 h-20 rounded-full bg-sage-300/20 flex items-center justify-center mx-auto mb-6"><Lock className="w-10 h-10 text-sage-400" /></div>
        <h1 className="text-2xl font-medium mb-2">{isSettingPin ? (confirmPin ? 'Confirm PIN' : 'Set PIN') : 'Enter PIN'}</h1>
        <p className="text-stone-500">{isSettingPin ? (confirmPin ? 'Enter your PIN again' : 'Choose a 4-digit PIN') : 'Enter your PIN to unlock'}</p>
      </motion.div>
      <div className="flex gap-4 mb-12">
        {[0, 1, 2, 3].map((i) => <motion.div key={i} animate={{ scale: pin.length > i ? 1.2 : 1, backgroundColor: error ? '#E57373' : pin.length > i ? '#9CAF88' : '#E8E5E1' }} className="w-4 h-4 rounded-full" />)}
      </div>
      {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 mb-4">{isSettingPin ? "PINs don't match" : 'Incorrect PIN'}</motion.p>}
      <div className="grid grid-cols-3 gap-4 max-w-xs">
        {numbers.map((num, i) => (
          <React.Fragment key={i}>
            {num === '' ? <div /> : num === 'del' ? (
              <button onClick={() => { setPin(pin.slice(0, -1)); setError(false); }} className="w-20 h-20 rounded-full flex items-center justify-center text-stone-500 hover:bg-cream-300 dark:hover:bg-charcoal-700"><Delete className="w-6 h-6" /></button>
            ) : (
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleNumberPress(num)} className="w-20 h-20 rounded-full bg-cream-200 dark:bg-charcoal-700 flex items-center justify-center text-2xl font-medium hover:bg-cream-300 dark:hover:bg-charcoal-600">{num}</motion.button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LockScreen;
