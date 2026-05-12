export const COLORS = {
  NAVY: '#0A1628',
  BRAND: '#1A3C8F',
  ACCENT: '#2563EB',
  LIGHT_BLUE: '#3B82F6',
  SKY: '#DBEAFE',
  SKY_LIGHT: '#93C5FD',
  WHITE: '#FFFFFF',
  OFF_WHITE: '#F8FAFF',
  GRAY_50: '#F1F5F9',
  GRAY_100: '#E2E8F0',
  GRAY_200: '#CBD5E1',
  GRAY_300: '#94A3B8',
  GRAY_400: '#94A3B8',
  GRAY_500: '#64748B',
  GRAY_600: '#475569',
  GRAY_700: '#334155',
  GRAY_900: '#0F172A',
  GREEN: '#16A34A',
  GREEN_BG: '#DCFCE7',
  AMBER: '#D97706',
  AMBER_BG: '#FEF3C7',
  RED: '#DC2626',
  RED_BG: '#FEE2E2',
} as const;

export type Color = (typeof COLORS)[keyof typeof COLORS];

export const GRADIENTS = {
  NAVY_BRAND: ['#0A1628', '#1A3C8F', '#2563EB'] as const,
  NAVY_BRAND_DEEP: ['#0A1628', '#1A3C8F', '#1E40AF'] as const,
  BRAND_ACCENT: ['#1A3C8F', '#2563EB', '#3B82F6'] as const,
  CARD_NAVY: ['#0A1628', '#1A3C8F'] as const,
};
