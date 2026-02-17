import React, { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { deleteCookie, getCookie } from "../utils/TS-Cookie";
import { logout as logoutapi } from "../features/auth/services/apiAuth";

interface ProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: ProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie({ name: "token" });
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutapi();
    } catch (error) {
      console.error("Logout failed:", error);
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
