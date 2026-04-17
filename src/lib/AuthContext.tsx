"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "./supabase-browser";

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
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const fetchUserProfile = React.useCallback(async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
         console.error('Error fetching profile:', error);
      }

      if (data) {
        setUser({
          id: data.id,
          name: data.name || 'Агент',
          email: data.email || email,
          isAdmin: data.is_admin,
          hasActiveSubscription: data.has_active_subscription
        });
        setIsAuth(true);
      } else {
        // Fallback if profile doesn't exist yet but user is authenticated
        setUser({
           id: userId,
           name: 'Агент',
           email: email,
           isAdmin: false,
           hasActiveSubscription: false
        });
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const refreshUser = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
       await fetchUserProfile(session.user.id, session.user.email!);
    } else {
       setIsAuth(false);
       setUser(null);
       setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted) {
        if (session?.user) {
          await fetchUserProfile(session.user.id, session.user.email!);
        } else {
          setIsLoading(false);
        }
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          if (session?.user) {
            await fetchUserProfile(session.user.id, session.user.email!);
          }
        } else if (event === 'SIGNED_OUT') {
          setIsAuth(false);
          setUser(null);
          setIsLoading(false);
          router.push("/");
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase.auth, fetchUserProfile]);

  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    // onAuthStateChange will handle state updates and redirect
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, isLoading, logout, refreshUser }}>
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
