import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Lock, Trash2, Heart } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/Button';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { useSettingsStore } from '@/store/settingsStore';
import { storage } from '@/services/storage';

export const Settings: React.FC = () => {
  const { theme, setTheme, lockEnabled, setLockEnabled } = useSettingsStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearData = async () => { await storage.clearAllMessages(); window.location.reload(); };
  const themeOptions = [{ value: 'light' as const, icon: Sun, label: 'Light' }, { value: 'dark' as const, icon: Moon, label: 'Dark' }, { value: 'system' as const, icon: Monitor, label: 'System' }];

  return (
    <div className="page-container">
      <Header title="Settings" showBack />
      <div className="space-y-8">
        <section>
          <h3 className="section-title mb-4">Appearance</h3>
          <div className="flex gap-2">
            {themeOptions.map(({ value, icon: Icon, label }) => (
              <button key={value} onClick={() => setTheme(value)} className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === value ? 'border-sage-300 bg-sage-300/10' : 'border-cream-300 dark:border-charcoal-700'}`}>
                <Icon className={`w-6 h-6 ${theme === value ? 'text-sage-400' : 'text-stone-400'}`} />
                <span className={`text-sm ${theme === value ? 'text-sage-400 font-medium' : 'text-stone-500'}`}>{label}</span>
              </button>
            ))}
          </div>
        </section>
        <section>
          <h3 className="section-title mb-4">Privacy</h3>
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><Lock className="w-5 h-5 text-stone-400" /><div><p className="font-medium">App Lock</p><p className="text-sm text-stone-500">Require PIN to open</p></div></div>
              <button onClick={() => setLockEnabled(!lockEnabled)} className={`w-12 h-7 rounded-full transition-colors ${lockEnabled ? 'bg-sage-300' : 'bg-cream-300 dark:bg-charcoal-700'}`}>
                <motion.div animate={{ x: lockEnabled ? 22 : 2 }} className="w-5 h-5 bg-white rounded-full shadow" />
              </button>
            </div>
          </div>
        </section>
        <section>
          <h3 className="section-title mb-4">Data</h3>
          <Button onClick={() => setShowClearConfirm(true)} variant="danger" icon={Trash2} fullWidth>Delete All Messages</Button>
          <p className="text-xs text-stone-400 mt-2 text-center">This action cannot be undone</p>
        </section>
        <section>
          <h3 className="section-title mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-rose-400" />If you are in crisis</h3>
          <div className="card">
            <p className="text-sm text-stone-500 mb-4">Please reach out to a crisis helpline or mental health professional.</p>
            <div className="space-y-2">
              <a href="tel:988" className="block p-3 bg-cream-200 dark:bg-charcoal-700 rounded-lg text-sage-400">National Suicide Prevention: 988</a>
              <a href="sms:741741" className="block p-3 bg-cream-200 dark:bg-charcoal-700 rounded-lg text-sage-400">Crisis Text Line: Text 741741</a>
            </div>
          </div>
        </section>
        <section className="text-center pt-8"><p className="text-stone-400 text-sm">Unsent v1.0.0</p><p className="text-stone-400 text-xs mt-1">Your thoughts belong to you.</p></section>
      </div>
      <ConfirmDialog isOpen={showClearConfirm} onClose={() => setShowClearConfirm(false)} onConfirm={handleClearData} title="Delete All Messages" message="All messages will be permanently deleted." confirmText="Delete Everything" variant="danger" />
    </div>
  );
};
