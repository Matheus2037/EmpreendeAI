/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { USUARIO_MOCK } from "@/mocks/usuario";

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

const MOCK_MODE = import.meta.env.VITE_MOCK_AUTH === "true";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(
    MOCK_MODE ? (USUARIO_MOCK as unknown as User) : null
  );
  const [loading, setLoading] = useState(!MOCK_MODE);

  useEffect(() => {
    if (MOCK_MODE) return;

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
