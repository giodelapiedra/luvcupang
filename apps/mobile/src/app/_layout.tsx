import '../../global.css';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts as usePlusJakartaSans,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Syne_700Bold, Syne_800ExtraBold } from '@expo-google-fonts/syne';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/colors';
import { APP_NAME } from '@/constants/config';

function FontGate() {
  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: COLORS.NAVY }}>
      <StatusBar style="light" />
      <View className="h-20 w-20 items-center justify-center rounded-3xl bg-white/15">
        <Text className="text-3xl font-extrabold text-white">LC</Text>
      </View>
      <Text className="mt-4 text-white">{APP_NAME}</Text>
    </View>
  );
}

function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    // Index/splash takes care of the initial redirect, so we only act once
    // segments has settled into one of the groups.
    if (!inAuthGroup && !inTabsGroup) return;

    if (!isAuthenticated && inTabsGroup) {
      router.replace('/(auth)/welcome');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated, segments, router]);

  return <Slot />;
}

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, staleTime: 5 * 60 * 1000 },
        },
      })
  );

  const [fontsLoaded] = usePlusJakartaSans({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Syne_700Bold,
    Syne_800ExtraBold,
  });

  if (!fontsLoaded) return <FontGate />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <AuthGuard />
          </ErrorBoundary>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
