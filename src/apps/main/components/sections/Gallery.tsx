import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';

interface GalleryImage {
  url: string;
  alt: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlpOL5H-EQtdnU7JAFVgncgGwi3xC1sq8yQC-5CfNPwUBUmV-4hiOYEQfTFkZOp-0y3IXI-rDVWYR_x7Q_KuGBdhWbDGjFCOn16bdT0_d36sovYliF19nc1wnLGwODR4HbEbn51sLP-6OloWwF4rHQj4qu__Z-jYy7lu5nGBKCEwAADPSyhvEo_Y8WKzzVCD_ZwIcBJnZdFOw5ajRFU3pEdjNPtlW_FS3f1p4ycXS5xP7HWM2c10EQY5qdxLGdvEElHnXH_PrHsDRc',
    alt: 'Action shot from last year\'s hackathon',
    title: 'The Grand Hackathon',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAomt3vUjw5_OtEYxF5V8nKTeIFKaZ6Bb_mvrcrHxic5jLj9l3k_YO_wJmy3-iwcdNwpTo2t5afJPs8PiaheDagAyZw-j_XFCIhixZahN02bRAM2kTsOqo_-5G0VKV7UgriyDiRzRtsTNxWB3lWyQE4wDo4CoUKC8mbV2bFhl1xfzE_WyQNUjTsSUld5ijl4xGqhV0dksbrnyy8Lhkne9GchDMaRXaIVo5iHL_USS6zTr_wYOe22QXWyx_egBDcj39gwwdFUHLbUrQw',
    alt: 'E-sports gaming tournament stage',
    title: 'Valhalla Gaming',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMzCFszPEnObGGwpkYAgqUi4ieq6psoe-VAzW9gghBHc-SLeiyRzvllcmgBUzsmRIKCFHldNfNzzc8t9S-Ly1inUqQlW9OOk3BIXPQd21f31BdNrgBsd0Oj8roKOf6v5QDy_nKnpqYup-W_RaCcszhGJDWCh_azQaCU65zz9IkEuHeXW8xeHlj9IlT2gkqE1IuOjQU4ksgqj22L-7InjH-5v54syFTaMIOEMt7gkJJRVSMPTQBEfs8sLJ8itMJElXthjrDKM_4kNFh',
    alt: 'Robotics workshop and competition',
    title: 'Ancient Circuits',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm3R-_pcS85tICJR-BxsxMAq4f8bYcRxYi9IM54JJ3ZoMZOE94ZALhcL85X3-AgF-UIzH6bEKza9TOZTdbsMDFhoofY0B3pAMOQmESQZtxlIbfHplSFIUQ6l4eJZwxAF_UapM7P1veq2VQMGGYwr2A--xVmQoyIOQp_ELlsmT-T1mEeEfiYLJUnIRax1yc29ezNFo58-qXyUPWkgtDWMeYltXfAM9BRwfjyfQqJxJnma11mxby-AD7xSYocTRQoUNv2vGgMWq41G5Q',
    alt: 'Tech speakers on main stage',
    title: 'Olympus Stage',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv-UzRPvgrZLlVpWkv2mWwQQzVlZbHCQoWv5PC51Te6XHHDosmvp-ucUrytmon3pFE05AaZQD4AcSoVDC5we1K4R138opMym2ygIK4MhUIT11wBkdyevA6A_VnA7g_MCqj1IXo7KzLwUxlpKKDIv1_X7vlevct3b0sUKOVUM-GLX7qq5stTrhb4FiBcxGDNcZzltIupfeJTeF4BWdWsk_8HUIHcifPdVrjzncaBohB9nsAL0Q6qbWxEq143ZRq77eRULmDWLTJ29NB',
    alt: 'Students working in tech lab',
    title: 'Tech Titans',
  },
];

const Gallery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-12 bg-background-dark/95 overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-40 mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-12 bg-primary"></div>
          <h2 className="text-foreground text-xl sm:text-2xl md:text-[28px] lg:text-[36px] font-bold leading-tight tracking-[-0.015em] uppercase italic">
            Echoes of the Past
          </h2>
        </div>
        <p className="text-[#bab09c] mt-2 max-w-2xl">
          Witness the divine energy from previous incarnations of NIGMA. A legacy forged in fire.
        </p>
      </div>

      {/* Film Reel Container */}
      <div className={`relative transition-all duration-1000 delay-300 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        {/* Film Reel Strip */}
        <div className="relative py-8">
          {/* Film Perforations - Top */}
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center gap-4 px-4 bg-gradient-to-b from-[#1a1510] to-transparent">
            <div className="flex gap-2 w-full">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={`perf-top-${i}`} className="w-3 h-3 bg-primary/40 rounded-sm flex-shrink-0 border border-primary/60"></div>
              ))}
            </div>
          </div>

          {/* Film Perforations - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center gap-4 px-4 bg-gradient-to-t from-[#1a1510] to-transparent">
            <div className="flex gap-2 w-full">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={`perf-bottom-${i}`} className="w-3 h-3 bg-primary/40 rounded-sm flex-shrink-0 border border-primary/60"></div>
              ))}
            </div>
          </div>

          {/* Greek Border Top */}
          <div className="absolute top-8 left-0 right-0 h-2 bg-repeat-x opacity-50"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1tGTR8sbboS9ZGcJU6iaZN8_b_1efaWydHk0vaDfMKFSdF3sMZNiuj2xkZ880qhg75e1PvtJHf7mnsgu90cpwBEzm5buZCf9cIPH6BU4EEe945rcNje31WRVaVTqUK2u56VuJCBXd8NllQUksZCcQnDS5T3VNtIc9WL9tM02uEV8Js4kqBcQU6bYnMDKaPKC0ziokUTI9JdLBc9GdkF0L5Xfd_Z8xkh09KREWNxs3Ew1WQm_h5kx5ooYpudMBxNyxLqkWyedpMaxf")',
              backgroundSize: 'auto 100%',
            }}
          ></div>

          {/* Greek Border Bottom */}
          <div className="absolute bottom-8 left-0 right-0 h-2 bg-repeat-x opacity-50"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1tGTR8sbboS9ZGcJU6iaZN8_b_1efaWydHk0vaDfMKFSdF3sMZNiuj2xkZ880qhg75e1PvtJHf7mnsgu90cpwBEzm5buZCf9cIPH6BU4EEe945rcNje31WRVaVTqUK2u56VuJCBXd8NllQUksZCcQnDS5T3VNtIc9WL9tM02uEV8Js4kqBcQU6bYnMDKaPKC0ziokUTI9JdLBc9GdkF0L5Xfd_Z8xkh09KREWNxs3Ew1WQm_h5kx5ooYpudMBxNyxLqkWyedpMaxf")',
              backgroundSize: 'auto 100%',
            }}
          ></div>

          {/* Film Frames - Scrolling */}
          <div className="marquee py-4 bg-gradient-to-r from-[#1a1510] via-[#2d2318] to-[#1a1510]">
            <div className="marquee-content">
              <div className="flex gap-4 px-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="film-frame group relative w-[350px] aspect-video flex-shrink-0 gallery-frame"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Film Frame Border */}
                    <div className="absolute inset-0 border-4 border-primary/60 rounded-sm shadow-2xl">
                      {/* Corner Decorations */}
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-full overflow-hidden rounded-sm">
                      <div
                        className="w-full h-full bg-center bg-cover scale-100 group-hover:scale-110 transition-transform duration-700 sepia brightness-90"
                        style={{ backgroundImage: `url("${image.url}")` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1510] via-transparent to-transparent opacity-60"></div>
                      
                      {/* Film Grain Effect */}
                      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                        style={{
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                        }}
                      ></div>

                      {/* Frame Number */}
                      <div className="absolute top-2 right-2 bg-primary/80 px-2 py-1 text-background-dark text-xs font-bold">
                        #{String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Title */}
                      <p className="absolute bottom-3 left-3 text-primary font-bold tracking-wider uppercase text-sm drop-shadow-lg">
                        {image.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Duplicate for seamless loop */}
            <div className="marquee-content" aria-hidden="true">
              <div className="flex gap-4 px-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="film-frame group relative w-[350px] aspect-video flex-shrink-0 gallery-frame"
                  >
                    <div className="absolute inset-0 border-4 border-primary/60 rounded-sm shadow-2xl">
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                    </div>
                    <div className="relative w-full h-full overflow-hidden rounded-sm">
                      <div
                        className="w-full h-full bg-center bg-cover scale-100 group-hover:scale-110 transition-transform duration-700 sepia brightness-90"
                        style={{ backgroundImage: `url("${image.url}")` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1510] via-transparent to-transparent opacity-60"></div>
                      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                        style={{
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                        }}
                      ></div>
                      <div className="absolute top-2 right-2 bg-primary/80 px-2 py-1 text-background-dark text-xs font-bold">
                        #{String(index + 1).padStart(2, '0')}
                      </div>
                      <p className="absolute bottom-3 left-3 text-primary font-bold tracking-wider uppercase text-sm drop-shadow-lg">
                        {image.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
