import { Redirect } from 'expo-router';

export default function Index() {
  // Phase 0: jump straight into the tab navigator. Phase 1 will gate this on
  // a SecureStore session check and redirect unauth'd users to /(auth)/login.
  return <Redirect href="/(tabs)/home" />;
}
