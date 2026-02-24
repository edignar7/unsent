import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Compose } from '@/pages/Compose';
import { Vault } from '@/pages/Vault';
import { MessageView } from '@/pages/MessageView';
import { Reflection } from '@/pages/Reflection';
import { Settings } from '@/pages/Settings';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="compose" element={<Compose />} />
        <Route path="vault" element={<Vault />} />
        <Route path="message/:id" element={<MessageView />} />
        <Route path="reflection" element={<Reflection />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
