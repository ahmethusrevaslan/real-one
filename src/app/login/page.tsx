'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login, register, verifyUser } = useAuth();
  const [view, setView] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState('');

  // Redirect if already logged in
  if (isLoggedIn) {
    router.replace('/account');
    return null;
  }

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        router.push('/account');
      } else {
        setError(result.message || 'Giriş başarısız.');
        setLoading(false);
      }
    }, 600);
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    setLoading(true);
    setTimeout(() => {
      const result = register(name, email, password);
      setLoading(false);
      if (result.success && result.requiresVerification) {
        setVerifyEmail(result.email || email);
        setShowVerifyModal(true);
      } else if (!result.success) {
        setError(result.message || 'Kayıt başarısız.');
      }
    }, 600);
  };

  const simulateVerification = () => {
    verifyUser(verifyEmail);
    setShowVerifyModal(false);
    router.push('/account');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="bg-bg-secondary w-full max-w-[440px] p-12 rounded-xl border border-white/10 text-center shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
        {/* Logo */}
        <a href="/" className="block text-lg font-semibold tracking-[0.1em] uppercase mb-10">
          ANYWAY
        </a>

        {/* Login View */}
        {view === 'login' && (
          <div>
            <h1 className="text-2xl font-medium mb-2">Giriş Yap</h1>
            <p className="text-sm text-white/40 mb-8">
              Hesabınıza erişmek için bilgilerinizi girin.
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {error && (
                <div className="text-sm text-error bg-error/10 py-2 px-3 rounded">
                  {error}
                </div>
              )}
              <input
                name="email"
                type="email"
                placeholder="E-posta"
                required
                className="w-full px-4 py-3.5 text-sm border border-white/10 rounded-md bg-bg-tertiary text-white outline-none focus:border-white transition-colors"
              />
              <input
                name="password"
                type="password"
                placeholder="Şifre"
                required
                className="w-full px-4 py-3.5 text-sm border border-white/10 rounded-md bg-bg-tertiary text-white outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white text-black rounded-md text-sm font-semibold mt-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'GİRİŞ YAPILIYOR...' : 'DEVAM ET'}
              </button>
            </form>

            <div className="my-6 flex items-center text-white/40 text-xs uppercase tracking-[0.05em]">
              <span className="flex-1 h-px bg-white/10" />
              <span className="px-3">veya</span>
              <span className="flex-1 h-px bg-white/10" />
            </div>

            <p className="text-sm text-white/40">
              Hesabınız yok mu?{' '}
              <button
                onClick={() => { setView('register'); setError(''); }}
                className="text-white font-medium underline"
              >
                Kayıt Ol
              </button>
            </p>
          </div>
        )}

        {/* Register View */}
        {view === 'register' && (
          <div>
            <h1 className="text-2xl font-medium mb-2">Hesap Oluştur</h1>
            <p className="text-sm text-white/40 mb-8">
              Sipariş takibi ve favoriler için katılın.
            </p>

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              {error && (
                <div className="text-sm text-error bg-error/10 py-2 px-3 rounded">
                  {error}
                </div>
              )}
              <input
                name="name"
                type="text"
                placeholder="Ad Soyad"
                required
                className="w-full px-4 py-3.5 text-sm border border-white/10 rounded-md bg-bg-tertiary text-white outline-none focus:border-white transition-colors"
              />
              <input
                name="email"
                type="email"
                placeholder="E-posta"
                required
                className="w-full px-4 py-3.5 text-sm border border-white/10 rounded-md bg-bg-tertiary text-white outline-none focus:border-white transition-colors"
              />
              <input
                name="password"
                type="password"
                placeholder="Şifre"
                required
                className="w-full px-4 py-3.5 text-sm border border-white/10 rounded-md bg-bg-tertiary text-white outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white text-black rounded-md text-sm font-semibold mt-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'OLUŞTURULUYOR...' : 'KAYIT OL'}
              </button>
            </form>

            <div className="my-6 flex items-center text-white/40 text-xs uppercase tracking-[0.05em]">
              <span className="flex-1 h-px bg-white/10" />
              <span className="px-3">veya</span>
              <span className="flex-1 h-px bg-white/10" />
            </div>

            <p className="text-sm text-white/40">
              Zaten üye misiniz?{' '}
              <button
                onClick={() => { setView('login'); setError(''); }}
                className="text-white font-medium underline"
              >
                Giriş Yap
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-6 text-xs text-white/40">
        <a href="/legal#privacy" className="hover:text-white/70">Gizlilik</a>
        <a href="/legal#terms" className="hover:text-white/70">Şartlar</a>
      </div>

      {/* Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center">
          <div className="bg-white text-black p-10 max-w-[400px] w-[90%] text-center rounded">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="text-2xl font-medium mb-4">E-posta Doğrulama</h2>
            <p className="text-[#666] mb-6 leading-relaxed">
              <strong>{verifyEmail}</strong> adresine bir doğrulama bağlantısı gönderdik.
              Lütfen kutunuzu kontrol edin.
            </p>
            <button
              onClick={simulateVerification}
              className="w-full py-3.5 bg-black text-white rounded text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              DOĞRULAMA LİNKİNE TIKLA (SİMÜLASYON)
            </button>
            <button
              onClick={() => setShowVerifyModal(false)}
              className="mt-4 text-sm text-[#999] underline"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
