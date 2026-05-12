// Mobile-only types live here. Cross-cutting types shared with the backend
// belong in packages/types instead.
export type Loadable<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
