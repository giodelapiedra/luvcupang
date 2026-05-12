import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export type ServiceItem = {
  id: string;
  iconName: IoniconName;
  label: string;
  accent: string; // icon container color
};

// Flat icons via Ionicons (no emoji). Accent is the brand color for the
// icon container — single solid color, no gradient.
export const SERVICES: ServiceItem[] = [
  { id: 'assistance', iconName: 'hand-left-outline', label: 'Assistance', accent: '#2563EB' },
  { id: 'clearance', iconName: 'document-text-outline', label: 'Clearance', accent: '#16A34A' },
  { id: 'ireport', iconName: 'megaphone-outline', label: 'iReport', accent: '#D97706' },
  { id: 'elupon', iconName: 'shield-checkmark-outline', label: 'E-Lupon', accent: '#9333EA' },
  { id: 'booking', iconName: 'business-outline', label: 'Facility', accent: '#EA580C' },
  { id: 'scholarship', iconName: 'school-outline', label: 'Scholarship', accent: '#0D9488' },
  { id: 'medical', iconName: 'medkit-outline', label: 'Medical', accent: '#E11D48' },
  { id: 'jobs', iconName: 'briefcase-outline', label: 'Jobs', accent: '#475569' },
];

export const SERVICE_BY_LABEL: Record<string, ServiceItem> = SERVICES.reduce(
  (acc, s) => {
    acc[s.label.toLowerCase()] = s;
    return acc;
  },
  {} as Record<string, ServiceItem>
);
