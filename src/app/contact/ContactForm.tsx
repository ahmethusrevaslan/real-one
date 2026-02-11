'use client';

import { FormEvent } from 'react';
import { CONTACT } from '@/lib/constants';

export default function ContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const message = form.get('message') as string;

    const subject = `ANYWAY İletişim - ${name}`;
    const body = `Ad: ${name}\nE-posta: ${email}\n\n${message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-bg-secondary border border-white/10 p-12 rounded-2xl backdrop-blur-xl transition-all duration-400 focus-within:border-white/20 focus-within:shadow-[0_0_60px_rgba(0,0,0,0.2)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          name="name"
          placeholder="Ad Soyad"
          required
          className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder="E-posta"
          required
          className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors"
        />
        <textarea
          name="message"
          placeholder="Mesajınız"
          required
          rows={5}
          className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors resize-none"
        />
        <button
          type="submit"
          className="mt-4 px-12 py-4 text-xs font-medium uppercase tracking-[0.12em] bg-white text-black rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-400"
        >
          Gönder
        </button>
        <p className="text-xs text-white/40 text-center mt-4">
          E-posta uygulamanız açılacaktır.
        </p>
      </form>
    </div>
  );
}
