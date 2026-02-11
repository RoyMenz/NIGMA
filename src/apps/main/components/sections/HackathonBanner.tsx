import React from 'react';
import './HackathonBanner.css';
import { useHackathon } from '../../contexts/HackathonContext';

const HackathonBanner: React.FC = () => {
  const { open: openHackathon } = useHackathon();

  return (
    <section className="w-full flex justify-center mt-[5px] px-2 sm:px-4">
      <div className="flex flex-col max-w-[1200px] w-full px-2 sm:px-4 md:px-6">
        <div className="w-full">
          <div className="flex min-h-[320px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[520px] flex-col gap-4 sm:gap-6 md:gap-8 bg-cover bg-center bg-no-repeat rounded-lg sm:rounded-xl md:rounded-2xl items-center justify-center p-4 sm:p-6 md:p-8 bronze-gradient border border-primary/20 shadow-2xl relative"
            style={{
              backgroundImage: 'linear-gradient(rgba(11, 28, 45, 0.7) 0%, rgba(11, 28, 45, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7slp6IKiKlth0mf5-9oylYtVUnV8Gk2WJL_8mj3Ub6PhCIlA0e1_kEnn2B22VqCgdYyScYMiGlFNMq346peMQ0L3uWGQnzrZiQmVDSxZTC5m2UXXwKQfwnyXvio-Cs3uNPLZ8-v65uunyxjv-mkpDbYwqzJrwMT900VcnZ3gVW1AyodK_UFHvdEJHZ87O-znry7DMH1k0-FX5TLh_owcxFGStD4sme6yX54OZ-7PYX-8yojz8ckOv5vC-572X3iAHJ_pzG6FjVpZS")'
            }}
          >
            {/* Decorative Icons */}
            <div className="absolute top-10 left-10 opacity-10 pointer-events-none hidden lg:block">
              <span className="material-symbols-outlined !text-9xl text-primary">military_tech</span>
            </div>
            <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none hidden lg:block">
              <span className="material-symbols-outlined !text-9xl text-primary">military_tech</span>
            </div>
            
            {/* Content */}
            <div className="flex flex-col gap-3 sm:gap-4 text-center max-w-[700px] z-10 px-2">
              <div className="flex justify-center mb-1 sm:mb-2">
                <span className="px-3 sm:px-4 py-1.5 rounded-full border border-primary text-primary text-[10px] sm:text-xs font-black tracking-[.3em] sm:tracking-[.4em] uppercase">
                  Flagship Event
                </span>
              </div>
              <h1 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black leading-tight tracking-[-0.033em] uppercase px-2">
               <span className="text-primary">Ragnocode</span>
              </h1>
              <h2 className="text-foreground/80 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed px-2 sm:px-4">
              A 20-hour high-intensity hackathon focused on innovation, collaboration, and execution.
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="hackathon-banner-stats flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-[800px] z-10 px-2">
              <div className="flex min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] flex-1 flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-stone-border bg-background-dark/40 backdrop-blur-sm text-center">
                <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Duration</p>
                <p className="text-primary tracking-tight text-2xl sm:text-3xl font-black leading-tight">20 Hours</p>
              </div>
              <div className="flex min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] flex-1 flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-primary/40 bg-primary/5 backdrop-blur-sm shadow-[0_0_15px_rgba(201,162,77,0.1)] text-center">
                <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Grand Prize</p>
                <p className="text-foreground tracking-tight text-2xl sm:text-3xl font-black leading-tight">Upto ₹40,000</p>
              </div>
              <div className="flex min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] flex-1 flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-stone-border bg-background-dark/40 backdrop-blur-sm text-center">
                <p className="text-foreground/60 text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Battalions</p>
                <p className="text-primary tracking-tight text-2xl sm:text-3xl font-black leading-tight">2-4 Members</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4 sm:gap-6 mt-2 sm:mt-4 z-10 w-full px-2">
              <button
                onClick={openHackathon}
                className="group hackathon-cta-btn flex w-full sm:w-auto min-w-0 sm:min-w-[280px] max-w-[320px] sm:max-w-none cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 sm:h-14 md:h-16 px-6 sm:px-8 bg-primary text-background-dark text-sm sm:text-base md:text-lg font-black uppercase tracking-[0.1em] hover:bg-foreground transition-all shadow-xl min-h-[48px] touch-action-manipulation active:scale-95"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  Join the force!
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-lg sm:text-xl">
                    arrow_forward
                  </span>
                </span>
              </button>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest italic">
          
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonBanner;
