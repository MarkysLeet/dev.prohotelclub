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
  notifyLikes: boolean;
  notifyReplies: boolean;
  notifyEmailUpdates: boolean;
  notifyMarketing: boolean;
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

  const fetchUserProfile = React.useCallback(async function fetchProfile(userId: string, email: string, retries = 3) {
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
          hasActiveSubscription: data.has_active_subscription,
          notifyLikes: data.notify_likes ?? true,
          notifyReplies: data.notify_replies ?? true,
          notifyEmailUpdates: data.notify_email_updates ?? true,
          notifyMarketing: data.notify_marketing ?? false
        });
        setIsAuth(true);
        setIsLoading(false);
      } else if (retries > 0) {
        // Wait for the trigger to create the profile
        setTimeout(() => fetchProfile(userId, email, retries - 1), 500); // 500ms instead of 1000ms
      } else {
        console.error('Profile not found after retries for user:', userId);
        // Do not authorize user if profile is missing to prevent bugs
        setIsAuth(false);
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setIsAuth(false);
      setUser(null);
      setIsLoading(false);
    }
  }, [supabase]);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session?.user) {
         await fetchUserProfile(session.user.id, session.user.email!);
      } else {
         setIsAuth(false);
         setUser(null);
         setIsLoading(false);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setIsAuth(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (mounted) {
          if (session?.user) {
            await fetchUserProfile(session.user.id, session.user.email!);
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        if (mounted) {
          setIsAuth(false);
          setUser(null);
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
          } else {
            setIsAuth(false);
            setUser(null);
            setIsLoading(false);
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
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      // Ensure we clear state even if API fails
      setIsAuth(false);
      setUser(null);
      setIsLoading(false);
      router.push("/");
    }
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
