import { useAppStore } from '@/store/app.store';

export function useAppState() {
  return useAppStore((s) => s);
}
