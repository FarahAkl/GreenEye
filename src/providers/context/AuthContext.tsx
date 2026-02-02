import { createContext } from 'react';
import type { loginT } from '../../schemas/authSchema';

interface AuthContextT {
  isAuthenticated: boolean;
  login: (data:loginT) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextT | null>(null);
