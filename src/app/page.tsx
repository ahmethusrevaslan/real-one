import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import WordRotator from '@/components/home/WordRotator';
import FeaturedGrid from '@/components/home/FeaturedGrid';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Intro Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-black relative z-[2]">
        <div className="text-left max-w-[1200px] px-6 md:px-12">
          <WordRotator />

          <p className="text-[15px] leading-relaxed text-white/70 max-w-[500px] mb-8">
            Sıradanlığı reddediyoruz. Her parça, mekanınızda bir imza niteliği taşır.
            Modern yaşamın kaosunda, sanatla nefes alan alanlar yaratıyoruz.
          </p>

          <div className="flex gap-4 mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] border border-white/10 text-white hover:border-white hover:bg-white/5 transition-all rounded"
            >
              İletişime Geç
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] bg-white text-black border border-white hover:opacity-90 transition-all rounded"
            >
              Koleksiyon
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedGrid />
    </>
  );
}
