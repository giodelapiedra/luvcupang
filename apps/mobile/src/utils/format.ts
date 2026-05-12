export function formatDate(iso: string, locale = 'en-PH'): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '');
  if (d.length !== 11) return raw;
  return `${d.slice(0, 4)}-${d.slice(4, 7)}-${d.slice(7)}`;
}

export function getInitials(firstName: string, lastName: string): string {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return `${f}${l}` || '?';
}

export function truncate(value: string, max = 80): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export function greeting(now = new Date()): 'morning' | 'afternoon' | 'evening' {
  const hour = now.getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

export function joinedNow(now = new Date()): string {
  return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function generateIdNumber(): string {
  const n = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `CLC-${year}-${n}`;
}
