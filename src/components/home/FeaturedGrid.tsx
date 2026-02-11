'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/products';
import { formatPrice } from '@/lib/formatPrice';

export default function FeaturedGrid() {
  const featured = getFeaturedProducts(4);

  if (featured.length === 0) return null;

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-12">
        Öne Çıkanlar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] bg-[#111] overflow-hidden rounded mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {product.status !== 'Available' && (
                <span className="absolute top-3 left-3 px-3 py-1.5 text-[10px] font-semibold uppercase bg-[#333] text-[#888] z-[2]">
                  {product.status.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium mb-1">{product.title}</h3>
                <p className="text-[11px] text-white/40 uppercase">
                  {product.category}
                </p>
              </div>
              <span className="text-sm">{formatPrice(product.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
