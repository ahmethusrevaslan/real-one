import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anyway.studio'),
  title: {
    default: 'ANYWAY — Çağdaş Sanat Stüdyosu',
    template: '%s — ANYWAY',
  },
  description: 'Statement art for modern spaces. Özenle seçilmiş çağdaş sanat eserleri.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'ANYWAY',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/images/brand-logo.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans bg-black text-white">
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartDrawer />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
