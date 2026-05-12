import axios, { type AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL, API_PREFIX } from '@/constants/config';

const ACCESS_TOKEN_KEY = 'clc.accessToken';

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// Auth header injector — runs on every request. Phase 1 will populate the
// stored token after login; in Phase 0 the call simply returns no header.
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.set?.('Authorization', `Bearer ${token}`);
    }
  } catch {
    // SecureStore can throw on web — safe to ignore in Phase 0.
  }
  return config;
});
