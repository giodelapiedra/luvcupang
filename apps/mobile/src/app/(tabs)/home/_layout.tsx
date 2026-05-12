import { Stack } from 'expo-router';

// Stack inside the Home tab. The detail screens (digital-id, coming-soon)
// push over the tab bar — they own the full screen while open.
export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="digital-id" />
      <Stack.Screen name="coming-soon" />
    </Stack>
  );
}
