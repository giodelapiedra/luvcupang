import Constants from 'expo-constants';

function resolveDevApiBase(): string {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    return `http://${host}:3000`;
  }
  return 'http://localhost:3000';
}

export const APP_NAME = 'Cupang Love Connect';
export const APP_TAGLINE = 'Your Modern Service Provider';
export const APP_FOOTER = 'The First Digital Barangay in Muntinlupa';
export const BARANGAY = 'Brgy. Cupang, Muntinlupa City';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? resolveDevApiBase();
export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

export const PUROK_OPTIONS = [
  'Purok 1',
  'Purok 2',
  'Purok 3',
  'Purok 4',
  'Purok 5',
  'Purok 6',
  'Purok 7',
  'Purok 8',
];

export const GENDER_OPTIONS = ['Male', 'Female', 'Prefer not to say'];
