import React from 'react';
import './InfoMap.css';

const InfoMap: React.FC = () => {
  return (
    <section className="info-map-section py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Info Section */}
        <div className="flex flex-col gap-4 sm:gap-6 col-span-12 lg:col-span-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-[2px] w-8 sm:w-12 bg-primary"></div>
            <h2 className="text-foreground text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight">The Citadel</h2>
          </div>
          <p className="text-[#bab09c] text-base sm:text-lg leading-relaxed">
          Dr. Nitte Shankara Adyanthaya Memorial First Grade College was established in 1988 by the Nitte Education Trust. <br />
          Dr. N.S.A.M. First Grade College has been a constituent college of Nitte (Deemed to be University), Mangalore, since June 2022. 
          </p>

          <div className="space-y-4 sm:space-y-6 mt-2 sm:mt-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex items-center justify-center size-10 sm:size-12 rounded-full border border-primary/30 bg-primary/10 text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-xl sm:text-2xl">location_on</span>
              </div>
              <div>
                <p className="text-foreground text-sm sm:text-base font-bold uppercase tracking-wider">Dr. NSAM First Grade College</p>
                <p className="text-[#bab09c] text-xs sm:text-sm">
                  Nitte, Karkala Taluk, Udupi-574110, Karnataka, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex items-center justify-center size-10 sm:size-12 rounded-full border border-primary/30 bg-primary/10 text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-xl sm:text-2xl">mail</span>
              </div>
              <div>
                <p className="text-foreground text-sm sm:text-base font-bold uppercase tracking-wider">
                  EMAIL US AT
                </p>
                <p className="text-[#bab09c] text-xs sm:text-sm break-all">nigma2k26@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex items-center justify-center size-10 sm:size-12 rounded-full border border-primary/30 bg-primary/10 text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-xl sm:text-2xl">phone_iphone</span>
              </div>
              <div>
                <p className="text-foreground text-sm sm:text-base font-bold uppercase tracking-wider">Connect with US</p>
                <p className="text-[#bab09c] text-xs sm:text-sm">+91 8310903547</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stylized Map Section */}
        <div className="relative group flex justify-center col-span-12 lg:col-span-6">
          {/* Greek-themed Interactive Map */}
          <div className="w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden border-2 border-primary/40 shadow-2xl bg-transparent">
            {/* Google Maps embed for Dr. NSAM First Grade College, Nitte */}
            <iframe
              src="https://www.google.com/maps?q=Dr.+NSAM+First+Grade+College,+Nitte&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoMap;
