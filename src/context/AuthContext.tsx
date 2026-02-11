'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { User, UserSession, Order, AuthResult, OrderItem } from '@/types/user';

interface AuthContextType {
  user: UserSession | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (name: string, email: string, password: string) => AuthResult;
  verifyUser: (email: string) => void;
  logout: () => void;
  updateUser: (data: Partial<UserSession>) => void;
  addOrder: (order: { items: OrderItem[]; total: number }) => string;
  getOrders: () => Order[];
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'anyway_users';
const SESSION_KEY = 'anyway_current_user';

function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): UserSession | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveSession(session: UserSession | null) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUser(getSession());
    setMounted(true);
  }, []);

  const login = useCallback((email: string, password: string): AuthResult => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      return { success: false, message: 'E-posta veya şifre hatalı.' };
    }

    if (!found.verified) {
      return { success: false, message: 'Lütfen önce e-posta adresinizi doğrulayın.' };
    }

    const session: UserSession = {
      name: found.name,
      email: found.email,
      verified: found.verified,
    };
    saveSession(session);
    setUser(session);
    return { success: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string): AuthResult => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'Bu e-posta adresi zaten kayıtlı.' };
    }

    const newUser: User = {
      name,
      email,
      password,
      verified: false,
      orders: [],
    };
    users.push(newUser);
    saveUsers(users);

    return { success: true, requiresVerification: true, email };
  }, []);

  const verifyUser = useCallback((email: string) => {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) return;

    users[userIndex].verified = true;
    saveUsers(users);

    const verified = users[userIndex];
    const session: UserSession = {
      name: verified.name,
      email: verified.email,
      verified: true,
    };
    saveSession(session);
    setUser(session);
  }, []);

  const logout = useCallback(() => {
    saveSession(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((data: Partial<UserSession>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      saveSession(updated);
      return updated;
    });
  }, []);

  const addOrder = useCallback((orderData: { items: OrderItem[]; total: number }): string => {
    if (!user) return '';
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.email === user.email);
    if (userIndex === -1) return '';

    const orderId = `TR-${Math.floor(100000 + Math.random() * 900000)}`;
    const order: Order = {
      id: orderId,
      date: new Date().toISOString(),
      items: orderData.items,
      total: orderData.total,
      status: 'İşleniyor',
    };

    if (!users[userIndex].orders) users[userIndex].orders = [];
    users[userIndex].orders!.push(order);
    saveUsers(users);

    return orderId;
  }, [user]);

  const getOrders = useCallback((): Order[] => {
    if (!user) return [];
    const users = getUsers();
    const found = users.find((u) => u.email === user.email);
    return found?.orders || [];
  }, [user]);

  if (!mounted) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          isLoggedIn: false,
          login: () => ({ success: false }),
          register: () => ({ success: false }),
          verifyUser: () => {},
          logout: () => {},
          updateUser: () => {},
          addOrder: () => '',
          getOrders: () => [],
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        verifyUser,
        logout,
        updateUser,
        addOrder,
        getOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
