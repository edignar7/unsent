import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { useSettingsStore } from './store/settingsStore';
import { useAuthStore } from './store/authStore';
import { LockScreen } from './pages/Lock';

function App() {
  const { theme, lockEnabled } = useSettingsStore();
  const { isUnlocked, checkPin, unlock } = useAuthStore();

  useEffect(() => { checkPin(); }, [checkPin]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else if (theme === 'light') root.classList.remove('dark');
    else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [theme]);

  if (lockEnabled && !isUnlocked) return <LockScreen onUnlock={unlock} />;

  return <BrowserRouter><AppRouter /></BrowserRouter>;
}

export default App;
