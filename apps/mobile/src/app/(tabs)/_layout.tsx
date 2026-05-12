import { Tabs } from 'expo-router';
import { FloatingTabBar } from '@/components/layout/FloatingTabBar';

// Custom floating pill tab bar (white card lifted off the bottom edge).
// Screen content needs to leave ~90px of bottom padding so it doesn't sit
// underneath the floating bar.
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="services" />
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}
