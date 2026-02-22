import React from 'react';

const BANNER_TEXT = 'Deadline Extended! Submit Your Hackathon PPTs by 23th February 2026, 4:00 PM';

const MarqueeBanner: React.FC = () => {
  const items = Array(6).fill(BANNER_TEXT);

  return (
    <div
      className="w-full bg-primary overflow-hidden whitespace-nowrap border-b border-black/10
                 py-1.5 sm:py-2"
      aria-live="polite"
      aria-label="Announcement: Registrations extended, join the battle now"
    >
      <div className="animate-marquee-banner flex items-center w-fit">
        <div className="flex shrink-0 items-center">
          {items.map((text, i) => (
            <span
              key={`a-${i}`}
              className="text-[#181611] font-black uppercase px-3 sm:px-4
                         text-xs sm:text-sm
                         tracking-[0.15em] sm:tracking-widest"
            >
              {text}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          {items.map((text, i) => (
            <span
              key={`b-${i}`}
              className="text-[#181611] font-black uppercase px-3 sm:px-4
                         text-xs sm:text-sm
                         tracking-[0.15em] sm:tracking-widest"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
