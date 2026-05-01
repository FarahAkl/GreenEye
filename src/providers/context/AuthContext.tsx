import { createContext } from "react";
import type { z } from "zod";
import { AuthResponseDataSchema } from "../../schemas/authSchema";

export type AuthUser = z.infer<typeof AuthResponseDataSchema>;

export interface AuthContextType {
  isAuthenticated: boolean;
  roles: string[];
  userId: string | null;
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
