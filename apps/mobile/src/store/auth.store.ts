import { create } from 'zustand';
import type { User } from '@/types/user.types';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (u: User) => void;
  patchUser: (patch: Partial<User>) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  patchUser: (patch) => {
    const current = get().user;
    if (!current) return;
    set({ user: { ...current, ...patch } });
  },

  logout: () => {
    // Phase 1: also call tokenService.clearTokens() here
    set({ user: null, isAuthenticated: false });
  },
}));
