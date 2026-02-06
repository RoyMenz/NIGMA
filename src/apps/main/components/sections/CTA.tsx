import React from 'react';
import './CTA.css';

const CTA: React.FC = () => {
  return (
    <section className="relative bg-background-dark/95 py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Meander Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 meander-pattern opacity-20"></div>

      <div className="mx-auto max-w-[960px] px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 text-center bg-gradient-to-br from-[#0d2140] to-[#0B1C2D] p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl border border-[#393328] relative">
          {/* Abstract lightning background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <span className="material-symbols-outlined absolute -top-10 -left-10 text-[20rem] text-primary">
              bolt
            </span>
          </div>

          <div className="flex flex-col gap-4 relative z-10">
            <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight">
              Join the Divine <span className="text-primary">Revolution</span>
            </h2>
            <p className="text-[#bab09c] text-base font-normal leading-normal max-w-[600px] mx-auto">
              The gates of Olympus are opening. Claim your place among the tech legends of this
              year's biggest college festival.
            </p>
          </div>

          <div className="relative z-10 w-full max-w-sm">
            <button className="cta-register-btn w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-primary text-background-dark text-lg font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-[0_10px_30px_-10px_rgba(201,162,77,0.4)]">
              <span className="truncate">Register Now</span>
            </button>
            <p className="mt-4 text-xs text-[#544c3b] uppercase font-bold tracking-widest">
              Limited Slots Available for Flagship Events
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 meander-pattern opacity-20"></div>
    </section>
  );
};

export default CTA;
