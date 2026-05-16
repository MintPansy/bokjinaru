import { create } from "zustand";
import { getMe } from "../services/api";
import { getStoredToken, setStoredToken } from "../services/http";
import type { AuthUser } from "../types/api";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  hydrated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  hydrated: false,
  login: (token, user) => {
    setStoredToken(token);
    set({ token, user, hydrated: true });
  },
  logout: () => {
    setStoredToken(null);
    set({ token: null, user: null, hydrated: true });
  },
  hydrate: async () => {
    const token = getStoredToken();
    if (!token) {
      set({ token: null, user: null, hydrated: true });
      return;
    }
    try {
      const user = await getMe();
      set({ token, user, hydrated: true });
    } catch {
      setStoredToken(null);
      set({ token: null, user: null, hydrated: true });
    }
  },
}));
