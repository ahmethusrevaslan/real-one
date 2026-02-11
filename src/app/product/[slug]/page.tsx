import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/lib/products';
import { formatPrice } from '@/lib/formatPrice';
import ProductDetailClient from './ProductDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Ürün Bulunamadı' };

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} — ANYWAY`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-[1400px] mx-auto pt-[140px] pb-[100px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-20 min-h-[80vh]">
      {/* Image */}
      <div className="relative bg-bg-secondary rounded-lg overflow-hidden border border-white/10">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto block"
        />
      </div>

      {/* Info */}
      <div className="relative">
        <a
          href="/collections"
          className="inline-flex items-center gap-2 text-white/40 text-[13px] mb-8 hover:text-white transition-colors"
        >
          ← KOLEKSİYONA DÖN
        </a>

        <p className="text-xs text-white/40 uppercase tracking-[0.1em] mb-3">
          {product.category}
        </p>
        <h1 className="text-[32px] font-light mb-6 tracking-tight">
          {product.title}
        </h1>
        <p className="text-2xl mb-10">{formatPrice(product.price)}</p>

        <p className="text-[15px] leading-[1.7] text-white/70 mb-10">
          {product.description}
        </p>

        {/* Add to Cart (Client) */}
        <ProductDetailClient product={product} />

        {/* Specs */}
        <div className="mt-[60px] border-t border-white/10">
          <div className="flex justify-between py-4 border-b border-white/10 text-[13px]">
            <span className="text-white/40">BOYUTLAR</span>
            <span>{product.dimensions}</span>
          </div>
          <div className="flex justify-between py-4 border-b border-white/10 text-[13px]">
            <span className="text-white/40">MALZEME</span>
            <span>{product.material}</span>
          </div>
          <div className="flex justify-between py-4 border-b border-white/10 text-[13px]">
            <span className="text-white/40">ÇERÇEVE</span>
            <span>{product.frame}</span>
          </div>
          <div className="flex justify-between py-4 border-b border-white/10 text-[13px]">
            <span className="text-white/40">DURUM</span>
            <span>{product.status === 'Available' ? 'Mevcut' : 'Satıldı'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
