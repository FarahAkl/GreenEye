import React, { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
// import { logout as APILogout } from "../services/apiAuth";
import { deleteCookie, getCookie } from "../utils/TS-Cookie";
import { useProfile } from "../features/profile/hooks/useProfile";

interface ProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: ProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getProfileError } = useProfile();

  useEffect(() => {
    const token = getCookie({ name: "token" });
    if (token && !getProfileError) {
      setIsAuthenticated(true);
    } else if (getProfileError) {
      deleteCookie({ name: "token" });
      setIsAuthenticated(false);
    }
  }, [getProfileError]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // await APILogout();
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
