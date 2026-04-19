import { createContext } from "react";
import type { z } from "zod";
import { AuthResponseDataSchema } from "../../schemas/authSchema";

export type AuthUser = z.infer<typeof AuthResponseDataSchema>;

export interface AuthContextType {
  isAuthenticated: boolean;
  roles: string[];
  login: (roles: string[]) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
