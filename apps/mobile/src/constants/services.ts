export type ServiceItem = {
  id: string;
  icon: string;
  label: string;
  color: string;
  border: string;
  iconBg: string;
};

export const SERVICES: ServiceItem[] = [
  { id: 'assistance', icon: '🤝', label: 'Assistance', color: '#EFF6FF', border: '#BFDBFE', iconBg: '#2563EB' },
  { id: 'clearance', icon: '📋', label: 'Clearance', color: '#F0FDF4', border: '#BBF7D0', iconBg: '#16A34A' },
  { id: 'ireport', icon: '📍', label: 'iReport', color: '#FFFBEB', border: '#FDE68A', iconBg: '#D97706' },
  { id: 'elupon', icon: '⚖️', label: 'E-Lupon', color: '#FDF4FF', border: '#E9D5FF', iconBg: '#9333EA' },
  { id: 'booking', icon: '🏛️', label: 'Facility', color: '#FFF7ED', border: '#FED7AA', iconBg: '#EA580C' },
  { id: 'scholarship', icon: '🎓', label: 'Scholarship', color: '#F0FDFA', border: '#99F6E4', iconBg: '#0D9488' },
  { id: 'medical', icon: '🏥', label: 'Medical', color: '#FFF1F2', border: '#FECDD3', iconBg: '#E11D48' },
  { id: 'jobs', icon: '💼', label: 'Jobs', color: '#F8FAFC', border: '#CBD5E1', iconBg: '#475569' },
];

export const SERVICE_BY_LABEL: Record<string, ServiceItem> = SERVICES.reduce(
  (acc, s) => {
    acc[s.label.toLowerCase()] = s;
    return acc;
  },
  {} as Record<string, ServiceItem>
);
