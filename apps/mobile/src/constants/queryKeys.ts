// Central registry of React Query keys. Phase 1+ will populate this.
// Keep keys as readonly tuples so consumers get full type inference.
export const QK = {
  me: ['me'] as const,
  feed: (category?: string) => ['feed', category ?? 'all'] as const,
  feedItem: (id: string) => ['feed', id] as const,
  serviceRequests: (status?: string) => ['service-requests', status ?? 'all'] as const,
  assistance: (status?: string) => ['assistance', status ?? 'all'] as const,
} as const;
