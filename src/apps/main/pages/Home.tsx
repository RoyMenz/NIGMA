import React from 'react';
import ConstellationBackground from '../../../shared/components/ConstellationBackground';

const Home: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background-dark">
      {/* Starfield background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0 }}
      >
        <ConstellationBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-background-dark/40 to-black/90 rc-noise-overlay" />
      </div>

      {/* Floating orbits / energy rings */}
      <div
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full border border-primary/40 rc-orbit"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-6rem] right-[-4rem] h-96 w-96 rounded-full border border-primary/30 rc-orbit rc-orbit-slow"
        aria-hidden="true"
      />

      {/* Main card */}
      <main
        className="relative z-10 mx-4 flex max-w-4xl flex-col items-center justify-center text-center"
        aria-label="Registration closed"
      >
        <div className="relative w-full overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-background-dark/80 via-marble-dark/70 to-black/90 p-[1px] rc-frame-glow">
          {/* Inner marble / glass surface */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-black/60 via-marble-dark/70 to-black/90 px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">
            {/* Pulsing rings behind text */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 rc-pulse-ring"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 rc-pulse-ring rc-pulse-ring-delay"
              aria-hidden="true"
            />

            {/* Header chip */}
            <div className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/60 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/80 rc-chip-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/80 rc-chip-ping" />
              <span>Ragnarok 2026</span>
            </div>

            {/* Main heading with glitch / split shadow */}
            <h1 className="relative mb-3 text-balance font-majestic text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl rc-glitch">
              Registration Closed
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-balance text-xs font-semibold uppercase tracking-[0.3em] text-primary/70 sm:text-sm">
              The gates have sealed · The arena is full
            </p>

            <p className="mx-auto mb-10 max-w-2xl text-balance text-sm text-foreground/80 sm:text-base md:text-lg">
              Thanks for the insane response. The warrior roster for this cycle
              is now locked in. You can still wander the halls, relive the
              legend, and prepare for whatever comes next.
            </p>

            {/* Info grid */}
            <div className="mb-10 grid w-full gap-4 text-left sm:grid-cols-3">
              <div className="rounded-xl border border-primary/25 bg-black/35 px-4 py-3 rc-tile">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Status
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary rc-dot-pulse" />
                  Registration Locked
                </div>
              </div>

              <div className="rounded-xl border border-primary/25 bg-black/35 px-4 py-3 rc-tile">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Timeline
                </div>
                <div className="mt-1 text-sm text-foreground">
                  25–26 February ·{' '}
                  <span className="text-primary/80">Ragnarok 2026</span>
                </div>
              </div>

              <div className="rounded-xl border border-primary/25 bg-black/35 px-4 py-3 rc-tile sm:col-span-1 sm:text-right">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Next cycle
                </div>
                <div className="mt-1 text-sm text-foreground">
                  Watch this space for the next call.
                </div>
              </div>
            </div>

            {/* Bottom text */}
            <div className="space-y-3 text-xs text-foreground/70 sm:text-sm">
              <p>
                Curious about what unfolded? Keep an eye on{' '}
                <span className="font-semibold text-primary">
                  official channels
                </span>{' '}
                for highlights, leaderboards, and behind‑the‑scenes chaos.
              </p>
              <p className="text-foreground/50">
                Until then, sharpen your skills. The next summoning will be
                louder, stranger, and far more legendary.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
