import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, PenLine, Archive, Sparkles } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/compose', icon: PenLine, label: 'Write' },
  { path: '/vault', icon: Archive, label: 'Vault' },
  { path: '/reflection', icon: Sparkles, label: 'Reflect' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-cream-50/90 dark:bg-charcoal-800/90 backdrop-blur-lg border-t border-cream-300 dark:border-charcoal-700">
      <div className="flex items-center justify-around max-w-lg mx-auto py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink key={path} to={path} className="flex flex-col items-center py-2 px-4 relative">
              {isActive && (
                <motion.div layoutId="nav-indicator" className="absolute inset-0 bg-sage-300/10 rounded-xl" />
              )}
              <Icon className={`w-6 h-6 ${isActive ? 'text-sage-400' : 'text-stone-400'}`} />
              <span className={`text-xs mt-1 ${isActive ? 'text-sage-400 font-medium' : 'text-stone-400'}`}>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
