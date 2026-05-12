export const PH_PHONE_REGEX = /^09\d{9}$/;

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) return 'This field is required';
  if (trimmed.length < 2) return 'Must be at least 2 characters';
  if (trimmed.length > 50) return 'Must be 50 characters or fewer';
  return null;
}

export function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return 'Mobile number is required';
  if (!PH_PHONE_REGEX.test(digits)) return 'Must be a PH mobile number (09XXXXXXXXX)';
  return null;
}

export function validateRequired(value: string, fieldLabel = 'This field'): string | null {
  if (!value || value.trim().length === 0) return `${fieldLabel} is required`;
  return null;
}

export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}
