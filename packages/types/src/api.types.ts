// Canonical API envelope. Every endpoint in the project conforms to this.

export interface ApiResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  meta: ApiResponseMeta | null;
}
