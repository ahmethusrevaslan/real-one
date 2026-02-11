import type { Metadata } from 'next';
import { CONTACT } from '@/lib/constants';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'ANYWAY ile iletişime geçin. Çağdaş sanat eserleri hakkında bilgi alın.',
};

export default function ContactPage() {
  return (
    <section className="pt-[140px] pb-20 min-h-[80vh]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-start opacity-0 animate-fade-up">
        {/* Left: Info */}
        <div>
          <div className="mb-12">
            <h1 className="text-3xl font-light tracking-tight mb-4">İletişim</h1>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-[400px]">
              Sorularınız için bize ulaşın. En kısa sürede dönüş yapacağız.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex flex-col gap-2 p-6 bg-bg-secondary border border-white/10 rounded-2xl hover:bg-bg-tertiary hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-400"
            >
              <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Telefon
              </span>
              <span className="text-lg font-light">{CONTACT.phone}</span>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex flex-col gap-2 p-6 bg-bg-secondary border border-white/10 rounded-2xl hover:bg-bg-tertiary hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-400"
            >
              <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                E-posta
              </span>
              <span className="text-lg font-light">{CONTACT.email}</span>
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <ContactForm />
      </div>
    </section>
  );
}
