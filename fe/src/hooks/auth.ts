import { firebaseAuth } from "@/config/firebase";
import type { FirebaseUser } from "@/types/firebase";
import { useEffect, useState } from "react";

/**
 * This hook is only supposed to be used
 * when we've already signed in
 * */
export function useAuthSignedIn() {
  const { user } = useAuth();
  return { user: user!, signOut: () => firebaseAuth.signOut() }
}

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(user => {
      setIsLoading(false);
      setUser(user);
    });
    return () => unregisterAuthObserver();
  }, []);
  return { user, isSignedIn: !!user, isLoading }
}
