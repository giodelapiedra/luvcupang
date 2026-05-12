import * as SecureStore from 'expo-secure-store';

// Phase 0/baseline: wired but not used. Phase 1 calls setTokens() after a
// successful OTP verify, and api.client.ts pulls the access token here on every
// request via its interceptor.
const ACCESS_TOKEN_KEY = 'clc.accessToken';
const REFRESH_TOKEN_KEY = 'clc.refreshToken';

async function safeGet(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function safeSet(key: string, value: string | null): Promise<void> {
  try {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch {
    // SecureStore not available on web — silently ignore in dev.
  }
}

export const tokenService = {
  getAccessToken: () => safeGet(ACCESS_TOKEN_KEY),
  getRefreshToken: () => safeGet(REFRESH_TOKEN_KEY),
  setTokens: async (access: string, refresh: string) => {
    await safeSet(ACCESS_TOKEN_KEY, access);
    await safeSet(REFRESH_TOKEN_KEY, refresh);
  },
  clearTokens: async () => {
    await safeSet(ACCESS_TOKEN_KEY, null);
    await safeSet(REFRESH_TOKEN_KEY, null);
  },
};
