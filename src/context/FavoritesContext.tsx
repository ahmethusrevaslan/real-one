'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  count: number;
  toggle: (id: string) => boolean;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  getAll: () => string[];
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'anyway_wishlist';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // localStorage not available
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage not available
    }
  }, [favorites, mounted]);

  const add = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((fid) => fid !== id));
  }, []);

  const toggle = useCallback((id: string): boolean => {
    let added = false;
    setFavorites((prev) => {
      if (prev.includes(id)) {
        added = false;
        return prev.filter((fid) => fid !== id);
      }
      added = true;
      return [...prev, id];
    });
    return added;
  }, []);

  const has = useCallback(
    (id: string): boolean => favorites.includes(id),
    [favorites]
  );

  const getAll = useCallback(() => favorites, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        count: favorites.length,
        toggle,
        has,
        add,
        remove,
        getAll,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
