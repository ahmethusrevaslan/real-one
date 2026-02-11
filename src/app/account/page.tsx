'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/formatPrice';

type Section = 'favorites' | 'orders' | 'settings';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, logout, getOrders } = useAuth();
  const { favorites, remove } = useFavorites();
  const [activeSection, setActiveSection] = useState<Section>('favorites');

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const favProducts = products.filter((p) => favorites.includes(p.id));
  const orders = getOrders();

  const sidebarLinks: { id: Section; label: string }[] = [
    { id: 'favorites', label: 'Favorilerim' },
    { id: 'orders', label: 'Siparişlerim' },
    { id: 'settings', label: 'Ayarlar' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] min-h-[80vh] pt-20">
      {/* Sidebar */}
      <aside className="bg-bg-secondary border-r border-white/10 p-6 lg:p-10">
        <nav className="flex flex-col gap-2 mt-10">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={`text-left px-4 py-3 text-sm rounded-lg transition-all ${
                activeSection === link.id
                  ? 'bg-white/5 text-white'
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={logout}
            className="text-left px-4 py-3 text-sm rounded-lg text-error mt-auto hover:bg-white/5 transition-all"
          >
            Çıkış Yap
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="p-6 lg:p-[60px_80px]">
        <div className="mb-12">
          <h1 className="text-[32px] font-light mb-2">
            Hoş geldin, <span>{user.name}</span>
          </h1>
          <p className="text-sm text-white/40">{user.email}</p>
        </div>

        {/* Favorites Section */}
        {activeSection === 'favorites' && (
          <div>
            <h2 className="text-lg font-normal mb-6">Kayıtlı Parçalar</h2>
            {favProducts.length === 0 ? (
              <div className="text-center py-20 text-white/40">
                Henüz favori ürününüz yok.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {favProducts.map((p) => (
                  <div key={p.id} className="group">
                    <div className="relative h-[300px] mb-4 rounded-lg overflow-hidden bg-[#111]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base mb-1">{p.title}</h3>
                        <p className="text-sm text-[#888]">{formatPrice(p.price)}</p>
                      </div>
                      <button
                        onClick={() => remove(p.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders Section */}
        {activeSection === 'orders' && (
          <div>
            <h2 className="text-lg font-normal mb-6">Sipariş Geçmişi</h2>
            {orders.length === 0 ? (
              <div className="text-center py-20 text-white/40">
                Henüz siparişiniz bulunmuyor.
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-[#333] p-6 rounded-lg bg-[#0f0f0f]"
                  >
                    <div className="flex justify-between mb-4 pb-4 border-b border-[#222]">
                      <div>
                        <div className="text-xs text-[#888] uppercase">Sipariş No</div>
                        <div className="font-semibold text-gold">{order.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#888] uppercase">Tarih</div>
                        <div>{new Date(order.date).toLocaleDateString('tr-TR')}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-4 overflow-x-auto">
                      {order.items.map((item) => (
                        <div key={item.id} className="relative w-[60px] h-[80px] flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="60px"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm px-3 py-1 bg-[#222] rounded text-[#aaa]">
                        {order.status}
                      </span>
                      <span className="font-semibold">
                        Toplam: {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div>
            <h2 className="text-lg font-normal mb-6">Hesap Ayarları</h2>
            <p className="text-white/40">Şu an değiştirilebilir ayar bulunmuyor.</p>
          </div>
        )}
      </main>
    </div>
  );
}
