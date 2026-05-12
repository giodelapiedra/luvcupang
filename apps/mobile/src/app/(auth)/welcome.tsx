import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui';
import { APP_TAGLINE, BARANGAY } from '@/constants/config';

const PILLARS = ['Social Welfare', 'Public Safety', 'Local Economy', 'Transparency'];

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* HERO */}
      <LinearGradient
        colors={['#0A1628', '#1A3C8F', '#2563EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <View className="items-center px-6 pb-12 pt-6">
            {/* LC mark */}
            <View
              className="h-16 w-16 items-center justify-center rounded-2xl border border-white/30"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <Text className="font-display text-xl font-extrabold text-white">LC</Text>
            </View>

            <Text className="mt-5 text-center font-display text-3xl font-extrabold leading-tight text-white">
              Cupang{'\n'}
              <Text style={{ color: '#93C5FD' }}>Love Connect</Text>
            </Text>
            <Text className="mt-2 text-center text-sm text-white/60">{APP_TAGLINE}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* BODY */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="px-5 pt-6">
          <View className="flex-row flex-wrap gap-2">
            {PILLARS.map((p) => (
              <View
                key={p}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5"
              >
                <Text className="text-[12px] font-semibold text-slate-700">{p}</Text>
              </View>
            ))}
          </View>

          <Text className="mt-5 text-[14px] leading-6 text-slate-600">
            Bridging the gap between residents and barangay services. Request clearances, claim ayuda,
            report concerns, and stay informed — all from one app, designed for the residents of {BARANGAY}.
          </Text>

          <View className="mt-8 gap-3">
            <Button label="Get Started" onPress={() => router.push('/(auth)/register')} />
            <Button
              label="I already have an account"
              variant="ghost"
              onPress={() => router.push('/(auth)/register')}
            />
          </View>

          <Text className="mt-8 text-center text-[11px] text-slate-400">{BARANGAY}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
