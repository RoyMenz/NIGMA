import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventsArena from './pages/EventsArena';
import CursorTrail from '../../shared/components/CursorTrail';
import { HackathonProvider } from './contexts/HackathonContext';

const MainApp: React.FC = () => {
  return (
    <HackathonProvider>
      <Router>
        <div className="bg-background-light dark:bg-background-dark font-display text-foreground transition-colors duration-300">
          <CursorTrail />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsArena />} />
          </Routes>
        </div>
      </Router>
    </HackathonProvider>
  );
};

export default MainApp;
