import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
