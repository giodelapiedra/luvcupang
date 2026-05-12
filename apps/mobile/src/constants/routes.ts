export const ROUTES = {
  AUTH_LOGIN: '/(auth)/login',
  AUTH_REGISTER: '/(auth)/register',
  TAB_HOME: '/(tabs)/home',
  TAB_SERVICES: '/(tabs)/services',
  TAB_FEED: '/(tabs)/feed',
  TAB_ACCOUNT: '/(tabs)/account',
} as const;

export type RouteKey = keyof typeof ROUTES;
