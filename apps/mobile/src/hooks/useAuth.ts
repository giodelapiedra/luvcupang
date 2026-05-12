import { useCallback } from 'react';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/types/user.types';

// Screens consume this hook — they never import the store directly. Keeps the
// store swappable (Phase 1 will mount real session restore + token refresh).
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);
  const patchUser = useAuthStore((s) => s.patchUser);
  const storeLogout = useAuthStore((s) => s.logout);

  const login = useCallback((u: User) => setUser(u), [setUser]);

  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  return { user, isAuthenticated, login, logout, patchUser };
}
