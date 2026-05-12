import { ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SERVICES } from '@/constants/services';
import { ServiceCard } from '@/components/home';
import { COLORS } from '@/constants/colors';

export default function Services() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="light" />

      <View style={{ backgroundColor: COLORS.BRAND }}>
        <SafeAreaView edges={['top']}>
          <View className="px-4 pb-5 pt-3">
            <Text className="font-display text-2xl font-extrabold text-white">All Services</Text>
            <Text className="mt-1 text-xs text-white/70">
              Every service the barangay offers — coming online phase by phase.
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View className="flex-row flex-wrap justify-between gap-y-3">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/home/coming-soon',
                  params: { title: s.label },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
