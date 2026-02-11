'use client';

import { useEffect, useRef } from 'react';

interface CardData {
  number: string;
  title: string;
  description: string;
}

export default function GlowCardsSection({ cards }: { cards: CardData[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardElements = sectionRef.current?.querySelectorAll('.about-card');
    cardElements?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={card.number}
            className="about-card relative rounded-3xl border border-white/10 p-3 min-h-[220px] bg-transparent opacity-0 translate-y-10 transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
          >
            <div className="relative h-full flex flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/10 bg-bg-secondary p-6 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-bg-tertiary hover:-translate-y-0.5 hover:border-white/20">
              <span className="text-[11px] font-medium tracking-[0.15em] text-white/40">
                {card.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-white/70">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .about-card.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
