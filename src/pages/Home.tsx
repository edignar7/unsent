import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenLine, Archive, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/Button';
import { useMessages } from '@/hooks/useMessages';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { messages } = useMessages();

  return (
    <div className="page-container">
      <Header showSettings />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-3xl font-light text-charcoal-800 dark:text-cream-100 mb-4">
          Unsent
        </h1>
        <p className="text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
          This is your private space. No one else will see what you write here.
        </p>
      </motion.div>

      <div className="space-y-4 mt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Button onClick={() => navigate('/compose')} icon={PenLine} fullWidth size="lg">
            Write something
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Button onClick={() => navigate('/vault')} icon={Archive} variant="secondary" fullWidth size="lg">
            Open Vault ({messages.length})
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button onClick={() => navigate('/reflection')} icon={Sparkles} variant="ghost" fullWidth size="lg">
            View Reflections
          </Button>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-stone-400 mt-12"
      >
        Your thoughts belong to you.<br />We do not read them. We do not keep copies.
      </motion.p>
    </div>
  );
};
