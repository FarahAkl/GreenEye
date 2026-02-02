import { useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./context/AuthContext";
import { deleteCookie } from "../utils/TS-Cookie";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSetUser = (data: AuthUser) => {
    setUser(data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    deleteCookie({ name: "token" });
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    setUser: handleSetUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
