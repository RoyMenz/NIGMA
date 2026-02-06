import React, { useState } from 'react';
import './Footer.css';
import TechnicalTeam from '../sections/TechnicalTeam';

const Footer: React.FC = () => {
  const [isTechTeamOpen, setIsTechTeamOpen] = useState(false);

  return (
    <>
      <footer className="arena-footer landing-footer">
        <div className="arena-footer-content" style={{ justifyContent: 'center', padding: '1rem' }}>
          <button
            type="button"
            onClick={() => setIsTechTeamOpen(true)}
            className="footer-tech-btn px-5 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-background-dark transition-colors text-sm md:text-base min-h-[44px] touch-action-manipulation">
            Technical Team
          </button>            
        </div>
        <p className="arena-footer-text">N-IGMA © 2026 • Powered by the Forge of Young Minds</p>
      </footer>

      {isTechTeamOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background-dark/70 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-foreground/10 bg-[#0B1C2D]/95 p-4 md:p-8">
            <button
              type="button"
              onClick={() => setIsTechTeamOpen(false)}
              className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full border border-white/20 bg-background-dark/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground hover:bg-foreground/10 modal-close-btn touch-action-manipulation"
            >
              Close
            </button>
            <TechnicalTeam />
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
