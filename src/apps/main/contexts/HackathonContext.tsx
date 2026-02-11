import React, { createContext, useContext, useState, useCallback } from 'react';
import HackathonModal from '../components/HackathonModal';

interface HackathonContextValue {
  open: () => void;
}

const HackathonContext = createContext<HackathonContextValue | null>(null);

export const HackathonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <HackathonContext.Provider value={{ open }}>
      {children}
      <HackathonModal isOpen={isOpen} onClose={close} />
    </HackathonContext.Provider>
  );
};

export const useHackathon = (): HackathonContextValue => {
  const ctx = useContext(HackathonContext);
  if (!ctx) {
    throw new Error('useHackathon must be used within HackathonProvider');
  }
  return ctx;
};
