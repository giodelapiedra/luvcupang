import Constants from 'expo-constants';

// On a physical device, localhost points at the phone itself — use the host
// machine's LAN IP via Expo's `hostUri`. iOS simulator + Android emulator
// both also work with the LAN IP, so we prefer it across the board.
function resolveDevApiBase(): string {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    return `http://${host}:3000`;
  }
  return 'http://localhost:3000';
}

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? resolveDevApiBase();

export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;
