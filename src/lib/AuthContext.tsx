"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuth: boolean;
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
  const router = useRouter();

  // Keep localStorage in sync if state changes elsewhere
  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isAuth", "true");
    } else {
      localStorage.removeItem("isAuth");
    }
  }, [isAuth]);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
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
