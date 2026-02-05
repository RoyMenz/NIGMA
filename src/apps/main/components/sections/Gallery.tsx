import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';
import nigma1 from '../../../../assets/images/nigma1.jpeg';
import nigma2 from '../../../../assets/images/nigma2.jpeg';
import nigma3 from '../../../../assets/images/nigma3.jpeg';
import nigma4 from '../../../../assets/images/nigma4.jpeg';
import nigma5 from '../../../../assets/images/nigma5.jpeg';
import nigma6 from '../../../../assets/images/nigma6.jpeg';

interface GalleryImage {
  url: string;
  alt: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: nigma1,
    alt: 'NIGMA 2024 Event Highlights',
    title: '',
  },
  {
    url: nigma2,
    alt: 'NIGMA 2024 Event Highlights',
    title: '',
  },
  {
    url: nigma3,
    alt: 'NIGMA 2024 Event Highlights',
    title: '',
  },
  {
    url: nigma4,
    alt: 'NIGMA 2024 Event Highlights',
    title: '',
  },
  {
    url: nigma5,
    alt: 'NIGMA 2024 Event Highlights',
    title: '',
  },
  {
    url: nigma6,
    alt: 'NIGMA 2024 Event Highlights',
    title: '',
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
                    className="film-frame group relative w-[350px] aspect-video flex-shrink-0"
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
                    className="film-frame group relative w-[350px] aspect-video flex-shrink-0"
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
