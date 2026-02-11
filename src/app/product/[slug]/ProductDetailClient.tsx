'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    openCart();
  };

  if (product.status !== 'Available') {
    return (
      <button
        disabled
        className="w-full py-5 bg-[#333] text-[#888] uppercase text-[13px] tracking-[0.1em] font-semibold cursor-not-allowed"
      >
        SATILDI
      </button>
    );
  }

  return (
    <>
      {/* Desktop Button */}
      <button
        onClick={handleAdd}
        className="w-full py-5 bg-white text-black uppercase text-[13px] tracking-[0.1em] font-semibold hover:opacity-90 transition-opacity hidden md:block"
      >
        SEPETE EKLE
      </button>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-white/10 z-[900] md:hidden">
        <button
          onClick={handleAdd}
          className="w-full py-4 bg-white text-black uppercase text-[13px] tracking-[0.1em] font-semibold hover:opacity-90 transition-opacity"
        >
          SEPETE EKLE
        </button>
      </div>
    </>
  );
}
