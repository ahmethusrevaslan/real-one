'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const { itemCount, openCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-20 z-[1000] grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-12 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-[20px]'
          : 'bg-transparent'
      }`}
    >
      {/* Left: Brand */}
      <div className="justify-self-start z-[1002]">
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.1em] uppercase text-white"
        >
          ANYWAY
        </Link>
      </div>

      {/* Center: Nav Links */}
      <div className="justify-self-center items-center gap-8 hidden lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[13px] font-medium tracking-[0.1em] uppercase text-white opacity-90 hover:opacity-100 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: Icons */}
      <div className="justify-self-end items-center gap-6 hidden lg:flex">
        {/* Auth Icon */}
        <Link
          href={isLoggedIn ? '/account' : '/login'}
          className="flex items-center text-white opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Hesap"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>

        {/* Cart Button */}
        <button
          onClick={openCart}
          className="relative flex items-center text-white opacity-80 hover:opacity-100 transition-opacity text-[13px] font-medium tracking-[0.05em] uppercase"
        >
          Sepet
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-white rounded-full" />
          )}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="flex flex-col justify-center gap-1.5 absolute right-6 top-1/2 -translate-y-1/2 lg:hidden z-[1001]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menü"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center gap-8 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-light tracking-[0.1em] uppercase text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={isLoggedIn ? '/account' : '/login'}
            className="text-lg font-light tracking-[0.1em] uppercase text-white/60"
            onClick={() => setMobileMenuOpen(false)}
          >
            {isLoggedIn ? 'Hesabım' : 'Giriş Yap'}
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openCart();
            }}
            className="relative text-lg font-light tracking-[0.1em] uppercase text-white/60"
          >
            Sepet
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-3 w-2 h-2 bg-white rounded-full" />
            )}
          </button>
        </div>
      )}
    </nav>
  );
}
