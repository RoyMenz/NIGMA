import React, { createContext, useContext, useState, useCallback } from 'react';
import HackathonComingSoonModal from '../components/HackathonComingSoonModal';

interface HackathonComingSoonContextValue {
  open: () => void;
}

const HackathonComingSoonContext = createContext<HackathonComingSoonContextValue | null>(null);

export const HackathonComingSoonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <HackathonComingSoonContext.Provider value={{ open }}>
      {children}
      <HackathonComingSoonModal isOpen={isOpen} onClose={close} />
    </HackathonComingSoonContext.Provider>
  );
};

export const useHackathonComingSoon = (): HackathonComingSoonContextValue => {
  const ctx = useContext(HackathonComingSoonContext);
  if (!ctx) {
    throw new Error('useHackathonComingSoon must be used within HackathonComingSoonProvider');
  }
  return ctx;
};
