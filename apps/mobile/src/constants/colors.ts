export const COLORS = {
  BRAND_BLUE: '#1A3C8F',
  ACCENT_BLUE: '#2563EB',
  WHITE: '#FFFFFF',
  BLACK: '#0F172A',
  GRAY: '#94A3B8',
  GRAY_LIGHT: '#E2E8F0',
  GRAY_DARK: '#475569',
  DANGER: '#DC2626',
  SUCCESS: '#16A34A',
  WARNING: '#F59E0B',
  BG: '#F8FAFC',
} as const;

export type ColorKey = keyof typeof COLORS;
