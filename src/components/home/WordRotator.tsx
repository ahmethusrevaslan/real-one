'use client';

import { useState, useEffect } from 'react';

const WORDS = ['intentional.', 'timeless.', 'quiet.', 'exclusive.', 'refined.'];
const INTERVAL = 2500;

export default function WordRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % WORDS.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <h2 className="text-[clamp(32px,5vw,64px)] font-light leading-[1.2] mb-8 flex flex-wrap md:flex-nowrap items-baseline gap-[0.3em]">
      <span>Every piece is</span>
      <span className="inline-block relative h-[1.2em] overflow-hidden w-[420px] text-left translate-y-4">
        {WORDS.map((word, i) => (
          <span
            key={word}
            className={`absolute top-0 left-0 italic font-medium word-gradient pb-1 transition-all duration-500 ${
              i === currentIndex
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            {word}
          </span>
        ))}
      </span>
    </h2>
  );
}
