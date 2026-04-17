"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
}

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available, otherwise false
  const [isAuth, setIsAuth] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("isAuth") === "true";
    }
    return false;
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    }
    return null;
  });
  const router = useRouter();

  // Keep localStorage in sync if state changes elsewhere
  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isAuth", "true");
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
      }
    } else {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("authUser");
    }
  }, [isAuth, user]);

  const login = () => {
    setIsAuth(true);
    // Для демо-целей хардкодим пользователя. 
    // Администратор с активной подпиской.
    setUser({
      id: '1',
      name: 'Виктор Грозан',
      email: 'viktor@grozan.studio',
      isAdmin: true,
      hasActiveSubscription: true,
    });
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
