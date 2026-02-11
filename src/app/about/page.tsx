import type { Metadata } from 'next';
import GlowCardsSection from './GlowCardsSection';

export const metadata: Metadata = {
  title: 'Hakkında',
  description: 'ANYWAY — Görmeyi bilenler için tasarlıyoruz. Çağdaş sanat stüdyosu.',
};

const CARDS = [
  { number: '01', title: 'Sessizlik', description: 'Görsel sessizlik, düşünce için alan yaratır. Her detay, minimalizmin gücüyle nefes alır.' },
  { number: '02', title: 'Biçim', description: 'Bilinçli tasarım — hiçbir şey kazara değil. Her oran, her boşluk hesaplanmıştır.' },
  { number: '03', title: 'Niyet', description: 'Dekorasyon değil, ifade. Her parça bir duygu, bir düşünce taşır.' },
  { number: '04', title: 'Malzeme', description: 'Reçine, cam, metal — ustalıkla bir araya getirilmiş. Dokunmadan hissedin.' },
  { number: '05', title: 'Mekân', description: 'Sanat, mekanı dönüştürür. Doğru parça, yaşam alanınıza ruh katar.' },
  { number: '06', title: 'Drop Disiplini', description: 'Sınırlı üretim, bilinçli lansman. Her koleksiyon, özel kalmak için tasarlanmıştır.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Manifesto */}
      <section className="pt-[180px] pb-20 px-6 md:px-12">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-6 opacity-0 animate-fade-up">
            Felsefe
          </p>
          <h1 className="text-2xl font-light tracking-tight leading-[1.15] mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Görmeyi bilenler için tasarlıyoruz.
          </h1>
          <p className="text-lg font-light leading-[1.7] text-white/70 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            ANYWAY, çağdaş sanat ve tasarımın kesişiminde bir stüdyo. Sıradanlığı reddediyoruz.
            Her eser, mekanınızda bir imza niteliği taşır — sessiz ama güçlü, minimal ama etkileyici.
          </p>
        </div>
      </section>

      {/* Cards */}
      <GlowCardsSection cards={CARDS} />
    </>
  );
}
