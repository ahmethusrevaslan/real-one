'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || 'N/A';

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-20 px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-light mb-4">Sipariş Onaylandı</h1>
        <p className="text-white/60 mb-2 leading-relaxed">
          Siparişiniz başarıyla oluşturuldu.
        </p>
        <p className="text-sm text-white/40 mb-8">
          Sipariş numaranız: <span className="text-gold font-semibold">{orderId}</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/collections"
            className="px-8 py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
          >
            Alışverişe Devam Et
          </Link>
          <Link
            href="/account"
            className="px-8 py-4 border border-white/10 text-xs font-semibold uppercase tracking-[0.1em] hover:border-white hover:bg-white/5 transition-all"
          >
            Siparişlerim
          </Link>
        </div>
      </div>
    </div>
  );
}
