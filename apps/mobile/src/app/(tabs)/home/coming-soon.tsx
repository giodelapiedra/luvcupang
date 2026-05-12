import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper, PageHeader } from '@/components/layout';
import { Button } from '@/components/ui';
import { SERVICES, type ServiceItem } from '@/constants/services';
import { COLORS } from '@/constants/colors';

const FALLBACK: ServiceItem = {
  id: 'unknown',
  icon: '✨',
  label: 'Service',
  color: '#EFF6FF',
  border: '#BFDBFE',
  iconBg: '#2563EB',
};

function findService(title: string | undefined): ServiceItem {
  if (!title) return FALLBACK;
  const lower = title.toLowerCase();
  return SERVICES.find((s) => s.label.toLowerCase() === lower) ?? FALLBACK;
}

function useSpin(durationMs: number, reverse = false) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [rotation, durationMs]);

  return rotation.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? ['0deg', '-360deg'] : ['0deg', '360deg'],
  });
}

export default function ComingSoonScreen() {
  const params = useLocalSearchParams<{ title?: string }>();
  const router = useRouter();
  const service = useMemo(() => findService(params.title), [params.title]);

  const outerSpin = useSpin(8000);
  const innerSpin = useSpin(12000, true);

  return (
    <ScreenWrapper background="#FFFFFF" edges={['top', 'left', 'right']}>
      <PageHeader title={service.label} />

      <View className="flex-1 items-center px-6 pt-8">
        <View className="h-44 w-44 items-center justify-center">
          <Animated.View
            className="absolute h-44 w-44 rounded-full border-2"
            style={{
              borderStyle: 'dashed',
              borderColor: `${service.iconBg}55`,
              transform: [{ rotate: outerSpin }],
            }}
          />
          <Animated.View
            className="absolute h-32 w-32 rounded-full border-2"
            style={{
              borderStyle: 'dashed',
              borderColor: `${service.iconBg}88`,
              transform: [{ rotate: innerSpin }],
            }}
          />
          <View
            className="h-20 w-20 items-center justify-center rounded-2xl"
            style={{ backgroundColor: service.iconBg }}
          >
            <Text className="text-3xl">{service.icon}</Text>
          </View>
        </View>

        <Text
          className="mt-5 text-xs font-extrabold uppercase tracking-widest"
          style={{ color: service.iconBg }}
        >
          {service.label}
        </Text>
        <Text className="mt-2 font-display text-2xl font-extrabold text-slate-900">
          Coming Soon!
        </Text>
        <Text className="mt-2 text-center text-sm leading-5 text-slate-600">
          We&apos;re working hard to bring you{' '}
          <Text className="font-bold">{service.label}</Text> — a digital barangay service designed to
          make your life easier.
        </Text>

        <View
          className="mt-6 w-full rounded-2xl border border-slate-100 bg-white p-4"
          style={{
            shadowColor: COLORS.NAVY,
            shadowOpacity: 0.08,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
          }}
        >
          {[
            'Available for all verified residents',
            'Fast digital processing — no long queues',
            'Real-time status notifications',
            '100% secure and transparent',
          ].map((line) => (
            <View key={line} className="mb-2 flex-row items-start gap-2">
              <Text className="text-[#16A34A]">✓</Text>
              <Text className="flex-1 text-[13px] text-slate-700">{line}</Text>
            </View>
          ))}
        </View>

        <View className="mt-6 w-full gap-3">
          <Text className="text-center text-[12px] text-slate-500">
            Get notified when this launches
          </Text>
          <Button label="Notify Me 🔔" onPress={() => undefined} />
          <Button
            label="← Back to Home"
            variant="outline"
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/home'))}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
