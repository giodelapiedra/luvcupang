import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui';
import { APP_TAGLINE, BARANGAY } from '@/constants/config';
import { COLORS } from '@/constants/colors';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface Pillar {
  iconName: IoniconName;
  label: string;
  accent: string;
}

const PILLARS: Pillar[] = [
  { iconName: 'heart-outline', label: 'Social Welfare', accent: '#DC2626' },
  { iconName: 'shield-checkmark-outline', label: 'Public Safety', accent: '#2563EB' },
  { iconName: 'storefront-outline', label: 'Local Economy', accent: '#EA580C' },
  { iconName: 'eye-outline', label: 'Transparency', accent: '#16A34A' },
];

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Hero — single brand gradient, no decoration */}
      <LinearGradient
        colors={['#1A3C8F', '#2563EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <View className="items-center px-6 pb-12 pt-8">
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
            <Text className="mt-2 text-center text-sm text-white/70">{APP_TAGLINE}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="px-5 pt-7">
          {/* Pillars — flat icon tiles */}
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {PILLARS.map((p) => (
              <View
                key={p.label}
                className="flex-row items-center gap-2 rounded-xl border border-slate-100 bg-white p-2.5"
                style={{ width: '48%' }}
              >
                <View
                  className="h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${p.accent}15` }}
                >
                  <Ionicons name={p.iconName} size={16} color={p.accent} />
                </View>
                <Text className="flex-1 text-[12px] font-semibold text-slate-800">{p.label}</Text>
              </View>
            ))}
          </View>

          <Text className="mt-6 text-[14px] leading-6 text-slate-600">
            Bridging the gap between residents and barangay services. Request clearances, claim
            ayuda, report concerns, and stay informed — all from one app, designed for the residents
            of {BARANGAY}.
          </Text>

          <View className="mt-8 gap-3">
            <Button label="Get Started" onPress={() => router.push('/(auth)/register')} />
            <Button
              label="I already have an account"
              variant="ghost"
              onPress={() => router.push('/(auth)/register')}
            />
          </View>

          <View className="mt-8 flex-row items-center justify-center gap-1.5">
            <Ionicons name="location-outline" size={12} color={COLORS.GRAY_400} />
            <Text className="text-center text-[11px] text-slate-400">{BARANGAY}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
