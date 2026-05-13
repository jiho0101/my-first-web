"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase/client";
import { signInWithEmail, signOut as signOutRequest, signUpWithEmail } from "../lib/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithEmail: typeof signInWithEmail;
  signUpWithEmail: typeof signUpWithEmail;
  signOut: typeof signOutRequest;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setUser(null);
      } else {
        setUser(data.user ?? null);
      }

      setLoading(false);
    };

    loadUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signOut: signOutRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
