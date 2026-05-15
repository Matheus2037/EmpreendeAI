/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [currentUser, setCurrentUser] =
    useState<AuthContextType["currentUser"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        document.cookie = "auth_token=; path=/; secure; samesite=strict";
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
