'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/formatPrice';

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, removeFromCart } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[1500] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full max-w-[400px] h-screen bg-[#111] border-l border-white/10 z-[2000] flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-base uppercase tracking-[0.1em]">Sepet</h2>
          <button
            onClick={closeCart}
            className="text-white text-2xl hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-center text-white/50 mt-10">
              Sepetiniz boş.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden bg-[#111]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-white/60">{item.category}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-sm">{formatPrice(item.price)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-white/40 hover:text-white/80 transition-colors underline"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-white/70">Toplam</span>
              <span className="text-sm font-medium">{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-4 bg-white text-black text-center text-sm font-semibold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
            >
              Ödemeye Geç
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
