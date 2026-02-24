import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, showSettings, rightAction }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 bg-cream-100/80 dark:bg-charcoal-900/80 backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-cream-300 dark:hover:bg-charcoal-700">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {title && <h1 className="text-xl font-medium">{title}</h1>}
        </div>
        <div className="flex items-center gap-2">
          {rightAction}
          {showSettings && (
            <button onClick={() => navigate('/settings')} className="p-2 rounded-full hover:bg-cream-300 dark:hover:bg-charcoal-700">
              <Settings className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
