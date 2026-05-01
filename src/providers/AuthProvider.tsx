import React, { useEffect, useState } from "react";
import { AuthContext, type AuthUser } from "./context/AuthContext";
import { getCookie, setCookie, deleteCookie } from "../utils/TS-Cookie";
import { logout as logoutapi } from "../features/auth/services/apiAuth";

interface ProviderProps {
  children: React.ReactNode;
}

// const parseRolesCookie = (): string[] => {
//   try {
//     const raw = getCookie({ name: "roles" });
//     if (!raw) return [];
//     const parsed = JSON.parse(decodeURIComponent(raw));
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     return [];
//   }
// };

const parseUserCookie = (): AuthUser | null => {
  try {
    const raw = getCookie({ name: "user" });
    if (!raw) return null;
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getCookie({ name: "token" });
  });

  const [user, setUser] = useState<AuthUser | null>(parseUserCookie);
  const [roles, setRoles] = useState<string[]>(() => user?.roles ?? []);

  useEffect(() => {
    const token = getCookie({ name: "token" });
    setIsAuthenticated(!!token);
    if (!token) {
      setRoles([]);
      setUser(null);
    }
  }, []);

  const login = (userData: AuthUser) => {
    setIsAuthenticated(true);
    setUser(userData);
    setRoles(userData.roles);
    
    setCookie({
      name: "roles",
      value: encodeURIComponent(JSON.stringify(userData.roles)),
      days: 14,
    });
    
    setCookie({
      name: "user",
      value: encodeURIComponent(JSON.stringify(userData)),
      days: 14,
    });
  };

  const logout = async () => {
    try {
      await logoutapi();
    } finally {
      setIsAuthenticated(false);
      setRoles([]);
      setUser(null);
      deleteCookie({ name: "roles" });
      deleteCookie({ name: "user" });
    }
  };

  const value = {
    isAuthenticated,
    roles,
    userId: user?.userId ?? null,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
