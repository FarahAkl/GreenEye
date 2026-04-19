import React, { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { getCookie, setCookie, deleteCookie } from "../utils/TS-Cookie";
import { logout as logoutapi } from "../features/auth/services/apiAuth";

interface ProviderProps {
  children: React.ReactNode;
}

const parseRolesCookie = (): string[] => {
  try {
    const raw = getCookie({ name: "roles" });
    if (!raw) return [];
    const parsed = JSON.parse(decodeURIComponent(raw));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function AuthProvider({ children }: ProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getCookie({ name: "token" });
  });

  const [roles, setRoles] = useState<string[]>(parseRolesCookie);

  useEffect(() => {
    const token = getCookie({ name: "token" });
    setIsAuthenticated(!!token);
    if (!token) {
      setRoles([]);
    }
  }, []);

  const login = (newRoles: string[]) => {
    setIsAuthenticated(true);
    setRoles(newRoles);
    setCookie({
      name: "roles",
      value: encodeURIComponent(JSON.stringify(newRoles)),
      days: 14,
    });
  };

  const logout = async () => {
    try {
      await logoutapi();
    } finally {
      setIsAuthenticated(false);
      setRoles([]);
      deleteCookie({ name: "roles" });
    }
  };

  const value = {
    isAuthenticated,
    roles,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
