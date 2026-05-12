import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_PREFIX } from '@/constants/config';
import { tokenService } from './token.service';

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await tokenService.getAccessToken();
  if (token) {
    config.headers.set?.('Authorization', `Bearer ${token}`);
  }
  return config;
});

// 401 interceptor stub — Phase 1 will replace with refresh-token rotation.
// For the baseline we just surface the error so screens can react.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Phase 1: attempt refresh + retry. Baseline just clears tokens.
      void tokenService.clearTokens();
    }
    return Promise.reject(error);
  }
);
