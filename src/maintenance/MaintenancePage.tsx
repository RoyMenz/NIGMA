import './maintenance.css';

export default function MaintenancePage() {
  // Standalone page, intentionally not using the app router so every endpoint
  // is effectively "under maintenance" when VITE_MAINTENANCE_MODE=1.
  return (
    <div className="nigma-maintenance-root dark">
      <div className="marble-bg font-sans text-white min-h-screen flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-particle top-[10%] left-[20%]" />
          <div className="floating-particle top-[30%] left-[80%]" />
          <div className="floating-particle top-[70%] left-[15%]" />
          <div className="floating-particle top-[85%] left-[60%]" />
          <div className="floating-particle top-[40%] left-[40%]" />
          <div className="floating-particle top-[60%] left-[90%]" />
        </div>

        <div className="laurel-wreath top-10 left-10 transform -rotate-12">
          <span className="material-symbols-outlined !text-[140px] sm:!text-[200px] lg:!text-[250px] text-primary">military_tech</span>
        </div>
        <div className="laurel-wreath bottom-10 right-10 transform rotate-12">
          <span className="material-symbols-outlined !text-[140px] sm:!text-[200px] lg:!text-[250px] text-primary">military_tech</span>
        </div>

        <main className="relative z-10 flex flex-col items-center justify-center text-center p-5 sm:p-6 max-w-4xl">
          <div className="mb-12 mythic-icon">
            <div className="relative inline-block">
              <span className="material-symbols-outlined !text-[120px] md:!text-[160px] text-primary">construction</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <span className="material-symbols-outlined !text-[60px] text-black">auto_awesome</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <h1 className="font-serif text-4xl md:text-7xl font-black tracking-[0.18em] sm:tracking-widest text-white leading-none">
              THE <span className="text-primary text-glow">FORGE</span> IS IN
            </h1>
            <h1 className="font-serif text-4xl md:text-7xl font-black tracking-[0.18em] sm:tracking-widest text-white leading-none">
              MAINTENANCE
            </h1>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8 w-full">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/60" />
            <span className="material-symbols-outlined text-primary text-2xl">hardware</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-primary/40 to-primary/60" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-gold-muted text-base sm:text-lg md:text-2xl font-light uppercase tracking-[0.25em] sm:tracking-[0.4em]">
              Please visit us again at <span className="text-primary font-bold">7 PM IST</span>
            </p>
            <div className="mt-8">
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-[0.3em] italic">
                The Gods are currently refining the digital realm.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
