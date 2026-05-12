import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { APP_NAME, APP_TAGLINE, APP_FOOTER } from '@/constants/config';
import { useAuth } from '@/hooks/useAuth';

const SPLASH_DURATION_MS = 2200;

export default function Splash() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace(isAuthenticated ? '/(tabs)/home' : '/(auth)/welcome');
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [router, isAuthenticated]);

  return (
    <LinearGradient
      colors={['#0A1628', '#1A3C8F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <StatusBar style="light" />

      <View className="items-center">
        <View
          className="h-24 w-24 items-center justify-center rounded-3xl border border-white/20"
          style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
        >
          <Text className="font-display text-3xl font-extrabold text-white">LC</Text>
        </View>

        <Text className="mt-6 font-display text-2xl font-extrabold text-white">{APP_NAME}</Text>
        <Text className="mt-1 text-sm text-white/60">{APP_TAGLINE}</Text>
      </View>

      <Text className="absolute bottom-10 text-[11px] text-white/40">{APP_FOOTER}</Text>
    </LinearGradient>
  );
}
