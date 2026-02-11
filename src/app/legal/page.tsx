import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Yasal Bilgiler',
  description: 'ANYWAY gizlilik politikası, satış sözleşmesi ve kullanım şartları.',
};

export default function LegalPage() {
  return (
    <div className="pt-[140px] pb-[120px] px-6 md:px-12 max-w-[800px] mx-auto min-h-[80vh]">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] text-white/40 hover:text-white transition-colors mb-8"
      >
        ← Ana Sayfa
      </Link>

      <div className="text-center mb-16">
        <h1 className="text-3xl font-light tracking-tight mb-4">Yasal Bilgiler</h1>
        <p className="text-[13px] text-white/40">Son güncelleme: Şubat 2026</p>
      </div>

      {/* Privacy */}
      <section id="privacy" className="mb-12">
        <h2 className="text-lg font-medium uppercase tracking-[0.1em] mb-4">
          Gizlilik Politikası
        </h2>
        <p className="text-[15px] leading-[1.8] text-white/70 mb-3">
          ANYWAY olarak kişisel verilerinizin korunmasına önem veriyoruz.
          Toplanan veriler yalnızca sipariş işleme ve iletişim amacıyla kullanılır.
        </p>
        <ul className="list-none space-y-3">
          <li className="text-[15px] leading-[1.8] text-white/70">
            <span className="text-white/30 mr-3">—</span>
            Kişisel verileriniz üçüncü taraflarla paylaşılmaz.
          </li>
          <li className="text-[15px] leading-[1.8] text-white/70">
            <span className="text-white/30 mr-3">—</span>
            Verilerinizin silinmesini talep edebilirsiniz.
          </li>
          <li className="text-[15px] leading-[1.8] text-white/70">
            <span className="text-white/30 mr-3">—</span>
            Çerezler yalnızca temel site işlevleri için kullanılır.
          </li>
        </ul>
      </section>

      <div className="h-px bg-white/10 my-16" />

      {/* Terms */}
      <section id="terms" className="mb-12">
        <h2 className="text-lg font-medium uppercase tracking-[0.1em] mb-4">
          Kullanım Şartları
        </h2>
        <p className="text-[15px] leading-[1.8] text-white/70 mb-3">
          Bu siteyi kullanarak aşağıdaki koşulları kabul etmiş olursunuz.
        </p>
        <ul className="list-none space-y-3">
          <li className="text-[15px] leading-[1.8] text-white/70">
            <span className="text-white/30 mr-3">—</span>
            Site içerikleri ANYWAY&apos;e aittir ve izinsiz kullanılamaz.
          </li>
          <li className="text-[15px] leading-[1.8] text-white/70">
            <span className="text-white/30 mr-3">—</span>
            Ürün görselleri temsilidir, gerçek ürün farklılık gösterebilir.
          </li>
          <li className="text-[15px] leading-[1.8] text-white/70">
            <span className="text-white/30 mr-3">—</span>
            Fiyatlar önceden haber verilmeksizin değiştirilebilir.
          </li>
        </ul>
      </section>
    </div>
  );
}
