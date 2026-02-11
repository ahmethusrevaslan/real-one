import Link from 'next/link';
import { CONTACT } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-20">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-normal mb-2">ANYWAY</h3>
            <p className="text-[15px] text-white/60">Çağdaş Sanat Stüdyosu</p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.1em] mb-6 text-white/50">
              Menü
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/collections"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Koleksiyon
              </Link>
              <Link
                href="/about"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Hakkında
              </Link>
              <Link
                href="/contact"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                İletişim
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.1em] mb-6 text-white/50">
              Takip Et
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {CONTACT.email}
              </a>
              <span className="text-sm text-white/70">
                {CONTACT.instagram}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/40">
          <p>© 2026 ANYWAY. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/legal#privacy" className="hover:text-white/70 transition-colors">
              Gizlilik
            </Link>
            <Link href="/legal#terms" className="hover:text-white/70 transition-colors">
              Şartlar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
