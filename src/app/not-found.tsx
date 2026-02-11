import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-[120px] font-light tracking-tight leading-none mb-4 text-white/10">
          404
        </h1>
        <p className="text-lg font-light mb-8">Sayfa bulunamadı.</p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
