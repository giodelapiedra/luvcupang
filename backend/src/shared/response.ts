import type { ApiResponse } from '@clc/types';

export type { ApiResponse };

export const ok = <T>(data: T, message = 'Success'): ApiResponse<T> => ({
  success: true,
  data,
  message,
  meta: null,
});

export const fail = (message: string): ApiResponse<null> => ({
  success: false,
  data: null,
  message,
  meta: null,
});

export const paginated = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): ApiResponse<T[]> => ({
  success: true,
  data,
  message: 'Success',
  meta: { page, limit, total },
});
