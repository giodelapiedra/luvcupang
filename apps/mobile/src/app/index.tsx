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
      colors={['#0A1628', '#1A3C8F', '#2563EB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <StatusBar style="light" />

      {/* Decorative rings */}
      <View
        className="absolute h-72 w-72 rounded-full border-2 border-dashed"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      />
      <View
        className="absolute h-96 w-96 rounded-full border-2 border-dashed"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      />

      <View className="relative items-center">
        {/* LC mark */}
        <View
          className="h-20 w-20 items-center justify-center rounded-3xl border border-white/30"
          style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
        >
          <Text className="font-display text-2xl font-extrabold text-white">LC</Text>
          <View
            className="absolute h-4 w-4 items-center justify-center rounded-full"
            style={{ bottom: -2, right: -2, backgroundColor: '#3B82F6' }}
          >
            <Text className="text-[10px] text-white">♥</Text>
          </View>
        </View>

        <Text className="mt-5 font-display text-2xl font-extrabold text-white">{APP_NAME}</Text>
        <Text className="mt-1 text-sm text-white/70">{APP_TAGLINE}</Text>
      </View>

      <Text className="absolute bottom-10 text-[11px] text-white/40">{APP_FOOTER}</Text>
    </LinearGradient>
  );
}
