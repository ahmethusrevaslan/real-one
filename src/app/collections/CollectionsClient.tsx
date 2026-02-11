'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, sortProducts } from '@/lib/products';
import { formatPrice } from '@/lib/formatPrice';
import { useFavorites } from '@/context/FavoritesContext';

const CATEGORIES = [
  { value: 'all', label: 'Tümü' },
  { value: 'canvas', label: 'Kanvas' },
  { value: 'mirror', label: 'Ayna' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'sculpture', label: 'Heykel' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Yeniden Eskiye' },
  { value: 'price-low', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-high', label: 'Fiyat: Yüksekten Düşüğe' },
];

export default function CollectionsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'newest';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState(initialSort);
  const { toggle, has } = useFavorites();

  const filtered = useMemo(() => {
    let items = activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);
    return sortProducts(items, activeSort);
  }, [activeCategory, activeSort]);

  return (
    <>
      {/* Filter Bar */}
      <section className="px-6 md:px-12 pb-12 max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.06]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 text-xs font-medium tracking-[0.08em] uppercase rounded-full transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort + Count */}
        <div className="flex items-center gap-6">
          <span className="text-xs text-white/40">{filtered.length} eser</span>
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="bg-transparent border border-white/10 rounded px-4 py-2 text-xs text-white/70 outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-black text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 pb-[120px] max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((product) => (
            <div key={product.id} className="group relative">
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggle(product.id);
                }}
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110 ${
                  has(product.id) ? 'text-red-500' : 'text-black'
                }`}
                aria-label="Favorilere ekle"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={has(product.id) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  className="w-[18px] h-[18px]"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <Link href={`/product/${product.id}`} className="block">
                {/* Image */}
                <div className="relative aspect-[3/4] bg-[#111] overflow-hidden rounded mb-4">
                  {product.status !== 'Available' && (
                    <span className="absolute top-3 left-3 px-3 py-1.5 text-[10px] font-semibold uppercase bg-[#333] text-[#888] z-[2]">
                      SOLD
                    </span>
                  )}
                  {product.featured && product.status === 'Available' && (
                    <span className="absolute top-3 left-3 px-3 py-1.5 text-[10px] font-semibold uppercase bg-white text-black z-[2]">
                      FEATURED
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium mb-1">{product.title}</h3>
                    <p className="text-[11px] text-white/40 uppercase">{product.category}</p>
                  </div>
                  <span className="text-sm">{formatPrice(product.price)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/40">
            Bu kategoride henüz eser bulunmuyor.
          </div>
        )}
      </section>
    </>
  );
}
