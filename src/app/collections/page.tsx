import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollectionsClient from './CollectionsClient';

export const metadata: Metadata = {
  title: 'Koleksiyon',
  description: 'ANYWAY Koleksiyonu. Özenle seçilmiş çağdaş sanat eserleri, kanvas tablolar ve aynalar.',
};

export default function CollectionsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-[140px] pb-[60px] px-6 md:px-12 max-w-[1600px] mx-auto opacity-0 animate-fade-up">
        <h1 className="text-[clamp(42px,8vw,72px)] font-light tracking-tight mb-4 leading-[1.1]">
          Koleksiyon
        </h1>
        <p className="text-base font-light text-white/70 max-w-[500px] leading-relaxed">
          Özenle seçilmiş çağdaş sanat eserleri. Her parça, mekanınıza karakter ve derinlik
          katmak için tasarlandı.
        </p>
      </section>

      {/* Collections Grid (Client Component) */}
      <Suspense fallback={<div className="px-6 md:px-12 pb-20 text-white/40">Yükleniyor...</div>}>
        <CollectionsClient />
      </Suspense>
    </>
  );
}
