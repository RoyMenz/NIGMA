import React from 'react';
import './HackathonBanner.css';

const HackathonBanner: React.FC = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col max-w-[1200px] w-full px-6">
        <div className="w-full">
          <div className="flex min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex-col gap-6 sm:gap-8 bg-cover bg-center bg-no-repeat rounded-xl sm:rounded-2xl items-center justify-center p-4 sm:p-6 md:p-8 bronze-gradient border border-primary/20 shadow-2xl relative"
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
            <div className="flex flex-col gap-4 text-center max-w-[700px] z-10">
              <div className="flex justify-center mb-2">
                <span className="px-4 py-1.5 rounded-full border border-primary text-primary text-xs font-black tracking-[.4em] uppercase">
                  Featured Event
                </span>
              </div>
              <h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-[-0.033em] uppercase px-2">
               <span className="text-primary">Ragnarcode</span>
              </h1>
              <h2 className="text-foreground/80 text-base font-medium leading-relaxed md:text-xl px-4">
                20 Hours of Immortal Creation. Forge your legacy in code. Assemble your pantheon of
                builders.
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-[800px] z-10">
              <div className="flex min-w-[140px] sm:min-w-[160px] md:min-w-[180px] flex-1 flex-col items-center gap-2 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-stone-border bg-background-dark/40 backdrop-blur-sm">
                <p className="text-white/60 text-xs font-bold uppercase tracking-tighter">Endurance</p>
                <p className="text-primary tracking-tight text-3xl font-black leading-tight">20 Hours</p>
              </div>
              <div className="flex min-w-[140px] sm:min-w-[160px] md:min-w-[180px] flex-1 flex-col items-center gap-2 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary/40 bg-primary/5 backdrop-blur-sm shadow-[0_0_15px_rgba(201,162,77,0.1)]">
                <p className="text-white/60 text-xs font-bold uppercase tracking-tighter">Grand Prize</p>
                <p className="text-foreground tracking-tight text-3xl font-black leading-tight">₹50,000</p>
              </div>
              <div className="flex min-w-[140px] sm:min-w-[160px] md:min-w-[180px] flex-1 flex-col items-center gap-2 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-stone-border bg-background-dark/40 backdrop-blur-sm">
                <p className="text-foreground/60 text-xs font-bold uppercase tracking-tighter">Battalions</p>
                <p className="text-primary tracking-tight text-3xl font-black leading-tight">2-4 Members</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-6 mt-4 z-10">
              <button className="group flex w-full sm:w-auto min-w-0 sm:min-w-[280px] max-w-[320px] sm:max-w-none cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 sm:h-16 px-6 sm:px-8 bg-primary text-background-dark text-base sm:text-lg font-black uppercase tracking-[0.1em] hover:bg-foreground transition-all shadow-xl">
                <span className="flex items-center gap-3">
                  COMING SOON
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
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
