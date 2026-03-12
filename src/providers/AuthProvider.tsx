import React, { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { deleteCookie, getCookie } from "../utils/TS-Cookie";
import { logout as logoutapi } from "../features/auth/services/apiAuth";

interface ProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: ProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getCookie({ name: "token" });
  });

  useEffect(() => {
    const token = getCookie({ name: "token" });
    setIsAuthenticated(!!token);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutapi();
    } finally {
      deleteCookie({ name: "token" });
      setIsAuthenticated(false);
    }
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
