import React from 'react';
import './Header.css';
import headerLogo from '../../../../assets/images/Header Logo.png';
import { useHackathonComingSoon } from '../../contexts/HackathonComingSoonContext';

const Header: React.FC = () => {
  const { open: openHackathonComingSoon } = useHackathonComingSoon();

  return (
    <header className="landing-header landing-header--top">
      <div className="landing-header-content">
        <div className="landing-logo">
          <img 
            src={headerLogo} 
            alt="NITTE - Dr NSAM First Grade College" 
          />
        </div>
        <div className="landing-nav-right">
          <button className="landing-hackathon-btn" onClick={openHackathonComingSoon}>
            Hackathon
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
