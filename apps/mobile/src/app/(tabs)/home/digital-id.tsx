import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenWrapper, PageHeader } from '@/components/layout';
import { Button } from '@/components/ui';
import { ResidentIDCard } from '@/components/id';
import { useAuth } from '@/hooks/useAuth';

export default function DigitalIdScreen() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <ScreenWrapper background="#F1F5F9" edges={['left', 'right']}>
      <PageHeader title="Digital Resident ID" />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <ResidentIDCard user={user} />

        {!user.verified ? (
          <View className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
            <View className="flex-row items-center gap-3">
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: '#EFF6FF' }}
              >
                <Ionicons name="shield-checkmark-outline" size={20} color="#1A3C8F" />
              </View>
              <View className="flex-1">
                <Text className="font-display text-[15px] font-bold text-slate-900">
                  Verify Your Identity
                </Text>
                <Text className="mt-1 text-[12px] leading-4 text-slate-600">
                  Upload a government-issued ID to unlock Ayuda, scholarship requests, and other
                  verified-resident services.
                </Text>
              </View>
            </View>
            <View className="mt-4">
              <Button
                label="Verify Identity Now"
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/home/coming-soon',
                    params: { title: 'Identity Verification' },
                  })
                }
              />
            </View>
          </View>
        ) : (
          <View className="mt-5">
            <Button
              label="View Verified Benefits"
              variant="secondary"
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/home/coming-soon',
                  params: { title: 'Assistance' },
                })
              }
            />
          </View>
        )}

        <Text className="mt-6 text-center text-[10px] text-slate-400">
          ID is locally generated for the baseline. Phase 1 will issue the real backend ID.
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}
