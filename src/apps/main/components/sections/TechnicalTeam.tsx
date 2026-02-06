import React, { useState, useRef, useEffect } from 'react';
import './TechnicalTeam.css';
import ronith from '../../../../assets/images/ronith.png';
import prarthana from '../../../../assets/images/prarthana.png';
import royston from '../../../../assets/images/royston.png';

const MOBILE_BREAKPOINT = 768;

const TechnicalTeam: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollActiveIndex, setScrollActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const ratiosRef = useRef<number[]>([0, 0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index >= 0) {
            ratiosRef.current[index] = entry.intersectionRatio;
            const ratios = [...ratiosRef.current];
            const max = Math.max(...ratios);
            const idx = max > 0.1 ? ratios.indexOf(max) : null;
            setScrollActiveIndex(idx);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-15% 0px -15% 0px',
      }
    );

    cardRefs.current.filter(Boolean).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  const getCardClass = (index: number) => {
    const base = 'technical-card group relative flex flex-col items-center';
    const activeIndex = isMobile ? scrollActiveIndex : hoveredIndex;

    if (activeIndex === null) return base;
    if (activeIndex === index) return `${base} technical-card--active`;
    if (activeIndex < index) return `${base} technical-card--right`;
    return `${base} technical-card--left`;
  };

  return (
    <section
      id="technical-team"
      className="relative py-10 md:py-14 px-4 lg:px-16"
    >
      {/* Decorative nebula background just for this section */}
      <div className="absolute inset-0 nebula-bg rounded-[2.5rem] border border-foreground/5 shadow-[0_20px_80px_rgba(11,28,45,0.7)] overflow-hidden" />

      {/* Floating elements layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ruins */}
        <div
          className="absolute top-16 left-6 w-24 h-36 bg-slate-800/20 rounded-lg -rotate-12 floating-ruin flex items-center justify-center border border-foreground/5"
          style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
        >
          <span className="material-symbols-outlined text-foreground/10 text-5xl">
            account_balance
          </span>
        </div>
        <div className="absolute bottom-16 right-6 w-32 h-24 bg-slate-800/20 rounded-lg rotate-45 floating-ruin flex items-center justify-center border border-foreground/5">
          <span className="material-symbols-outlined text-foreground/10 text-6xl">
            temple_hindu
          </span>
        </div>

        {/* Lightning & vertical accents */}
        <div className="absolute top-1/4 left-1/3 w-px h-24 bg-primary/40 blur-[1px] rotate-45" />
        <div className="absolute top-1/2 right-1/4 w-[2px] h-16 bg-primary/60 blur-[2px] -rotate-12" />

        {/* Embers */}
        <div className="ember top-1/4 left-1/4" />
        <div className="ember top-3/4 left-1/3" />
        <div className="ember top-1/2 right-1/3" />
        <div className="ember top-8 right-8" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-[0.3em] uppercase text-xs md:text-sm flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary/40" />
            Technical Architects of N-IGMA 26
            <span className="h-px w-10 bg-primary/40" />
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-b from-foreground via-foreground to-primary/40 bg-clip-text text-transparent">
            Technical Council
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#bab09c]">
            The keepers of the digital Bifrost — crafting, guarding, and
            scaling the tech that powers Ragnarok Website.
          </p>
        </div>

        {/* Team grid */}
        <div
          className="technical-team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12"
          onMouseLeave={() => !isMobile && setHoveredIndex(null)}
        >
          {/* Member 1 */}
          <div
            ref={(el) => { cardRefs.current[0] = el; }}
            className={getCardClass(0)}
            onMouseEnter={() => !isMobile && setHoveredIndex(0)}
          >
            <div className="relative w-52 h-72 md:w-56 md:h-80 transition-transform duration-500 group-hover:-translate-y-4">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div
                className="w-full h-full bg-center bg-no-repeat bg-contain transform group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url("' + ronith + '")',
                }}
              />
            </div>
            <div className="glass-plaque w-full mt-4 p-5 rounded-xl relative overflow-hidden group-hover:border-primary/50 transition-colors">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50" />
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                  Ronith Joshi
                </h3>
                <p className="text-primary text-xs md:text-sm font-semibold tracking-wide electric-glow uppercase">
                  Web Developer
                </p>
              </div>
            </div>
          </div>

          {/* Member 2 */}
          <div
            ref={(el) => { cardRefs.current[1] = el; }}
            className={getCardClass(1)}
            onMouseEnter={() => !isMobile && setHoveredIndex(1)}
          >
            <div className="relative w-52 h-72 md:w-56 md:h-80 transition-transform duration-500 group-hover:-translate-y-4">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div
                className="w-full h-full bg-center bg-no-repeat bg-contain transform group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url("' + prarthana + '")',
                }}
              />
            </div>
            <div className="glass-plaque w-full mt-4 p-5 rounded-xl relative overflow-hidden group-hover:border-primary/50 transition-colors">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50" />
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                  Prarthana Jain
                </h3>
                <p className="text-primary text-xs md:text-sm font-semibold tracking-wide electric-glow uppercase">
                  Web Developer
                </p>
              </div>
            </div>
          </div>

          {/* Member 3 */}
          <div
            ref={(el) => { cardRefs.current[2] = el; }}
            className={getCardClass(2)}
            onMouseEnter={() => !isMobile && setHoveredIndex(2)}
          >
            <div className="relative w-52 h-72 md:w-56 md:h-80 transition-transform duration-500 group-hover:-translate-y-4">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div
                className="w-full h-full bg-center bg-no-repeat bg-contain transform group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url("' + royston + '")',
                }}
              />
            </div>
            <div className="glass-plaque w-full mt-4 p-5 rounded-xl relative overflow-hidden group-hover:border-primary/50 transition-colors">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50" />
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                  Royston Menezes
                </h3>
                <p className="text-primary text-xs md:text-sm font-semibold tracking-wide electric-glow uppercase">
                  Backend Developer
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnicalTeam;

