import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import landingLogo from '../../../../assets/images/landing logo.png';
import './Hero.css';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = window.requestAnimationFrame(() => setIsMounted(true));
    return () => window.cancelAnimationFrame(timer);
  }, []);

  return (
    <section className={`relative w-full hero-section ${isMounted ? 'hero-mounted' : ''}`}>
      <div className="relative flex h-[100vh] w-full flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12 text-center hero-mobile-overrides">
        {/* Hero Content - fits inside background image (100vh) */}
        <div className="relative z-10 grid grid-cols-12 gap-4 max-w-6xl w-full">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col items-center gap-5 hero-content-inner">
          <div className="hero-text-block hero-logo-wrapper">
            <img
              src={landingLogo}
              alt="Ragnarok — Where Power Meets Passion"
              className="hero-logo w-full h-auto object-contain drop-shadow-[0_4px_24px_rgba(11,28,45,0.6)]"
            />
          </div>

          <div className="hero-text-block border-2 border-[#4FA3D1] bg-[#4FA3D1] rounded-lg px-6 py-3 pointer-events-none">
            <p className="text-black text-lg sm:text-xl font-bold tracking-wider">
              FEBRUARY 25-26 2026
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 hero-actions mt-[8px] w-full max-w-[600px]">
            <button 
            onClick={() => window.open(
              'https://drive.google.com/file/d/1n8_FeR5NT7sD-TCJ-j4GT2J_cseUV3TR/view?usp=drivesdk',
              '_blank')}
            className="flex min-w-0 w-full sm:w-auto sm:min-w-[200px] max-w-full sm:max-w-none cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 sm:h-14 px-6 sm:px-8 bg-primary text-background-dark text-base sm:text-lg font-black uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(201,162,77,0.5)] hover:scale-105 active:scale-95">
              <span className="truncate">Download Brochure</span>
            </button>
            <button 
              onClick={() => navigate('/events')}
              className="flex min-w-0 w-full sm:w-auto sm:min-w-[200px] max-w-full sm:max-w-none cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 sm:h-14 px-6 sm:px-8 bg-transparent border-2 border-[#4FA3D1] text-[#8fc9e0] text-base sm:text-lg font-black uppercase tracking-wider hover:bg-[#2d5a75]/60 hover:text-foreground hover:scale-105 active:scale-95 transition-all"
            >
              <span className="truncate">Explore Events</span>
            </button>
          </div>

          <button className="hero-text-block w-full max-w-[600px] flex items-center justify-center border-2 border-[#4FA3D1] bg-[#4FA3D1] rounded-lg px-6 py-3 text-black text-base sm:text-lg font-black uppercase tracking-wider cursor-pointer hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(201,162,77,0.5)] transition-all">
            <span className="truncate">GENERAL GUIDELINES</span>
          </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
