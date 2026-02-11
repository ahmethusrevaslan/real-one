'use client';

import { useState } from 'react';

export default function HeroSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background iframe */}
      <div className="absolute inset-0 z-0 bg-black">
        <iframe
          allowTransparency
          src="https://app.endlesstools.io/embed/772abef6-808c-450b-bd56-e190155667b1"
          title="Endless Tools Editor"
          className={`w-full h-full border-none transition-opacity duration-[2s] ${
            iframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIframeLoaded(true)}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[2] pointer-events-none w-full px-5">
        <h1 className="font-[var(--font-syne)] font-display text-[clamp(60px,15vw,200px)] font-extrabold tracking-tight leading-[0.9] mix-blend-exclusion text-white uppercase">
          ANYWAY
        </h1>
        <p className="text-sm tracking-[0.5em] uppercase mt-6 opacity-80">
          Statement art for modern spaces.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2]">
        <div className="w-px h-[60px] bg-gradient-to-b from-white to-transparent animate-scroll-down" />
      </div>
    </section>
  );
}
