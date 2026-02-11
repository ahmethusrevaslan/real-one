'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/formatPrice';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { isLoggedIn, addOrder } = useAuth();
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Sepetiniz Boş</h1>
          <p className="text-white/40 mb-8">Ödeme yapabilmek için sepetinize ürün ekleyin.</p>
          <a
            href="/collections"
            className="inline-block px-8 py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
          >
            Koleksiyona Git
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const orderId = addOrder({
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
        })),
        total,
      });
      clearCart();
      router.push(`/success?order=${orderId}`);
    }, 1000);
  };

  return (
    <div className="max-w-[1200px] mx-auto pt-[140px] pb-20 px-6 md:px-12">
      <h1 className="text-[clamp(32px,5vw,48px)] font-light mb-12">Ödeme</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
        {/* Form */}
        <div className="flex flex-col gap-10">
          {/* Contact */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.1em] mb-6 text-white/50">İletişim Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" placeholder="Ad" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors" />
              <input name="lastName" placeholder="Soyad" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors" />
            </div>
            <input name="email" type="email" placeholder="E-posta" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors mt-4" />
            <input name="phone" type="tel" placeholder="Telefon" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors mt-4" />
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.1em] mb-6 text-white/50">Teslimat Adresi</h2>
            <input name="address" placeholder="Adres" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <select name="city" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none cursor-pointer">
                <option value="" className="bg-black">Şehir Seçin</option>
                <option value="istanbul" className="bg-black">İstanbul</option>
                <option value="ankara" className="bg-black">Ankara</option>
                <option value="izmir" className="bg-black">İzmir</option>
                <option value="other" className="bg-black">Diğer</option>
              </select>
              <input name="postalCode" placeholder="Posta Kodu" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors" />
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.1em] mb-6 text-white/50">Ödeme Bilgileri</h2>
            <input name="cardNumber" placeholder="Kart Numarası" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input name="expiry" placeholder="AA/YY" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors" />
              <input name="cvv" placeholder="CVV" required className="w-full py-4 bg-transparent border-b border-white/10 text-[15px] text-white outline-none focus:border-white/40 transition-colors" />
            </div>
            <p className="text-xs text-white/30 mt-4">🔒 256-bit SSL ile güvenli ödeme</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-white text-black uppercase text-sm font-semibold tracking-[0.1em] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'İŞLENİYOR...' : 'SİPARİŞİ TAMAMLA'}
          </button>
        </div>

        {/* Summary */}
        <div className="bg-bg-secondary rounded-xl border border-white/10 p-8 h-fit sticky top-28">
          <h2 className="text-sm uppercase tracking-[0.1em] mb-6 text-white/50">Sipariş Özeti</h2>
          <div className="flex flex-col gap-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-16 h-20 rounded overflow-hidden bg-[#111] flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-white/40">{item.category}</p>
                  <p className="text-sm mt-1">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-white/60">
              <span>Ara Toplam</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>Kargo</span>
              <span>Ücretsiz</span>
            </div>
            <div className="flex justify-between text-base font-medium pt-4 border-t border-white/10">
              <span>Toplam</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
