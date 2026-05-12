import { Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/colors';
import { formatPhone } from '@/utils/format';

interface RowProps {
  label: string;
  value: string;
  last?: boolean;
}

function InfoRow({ label, value, last }: RowProps) {
  return (
    <View
      className={`flex-row items-center justify-between py-3 ${last ? '' : 'border-b border-slate-100'}`}
    >
      <Text className="text-[12px] font-medium uppercase tracking-wider text-slate-500">{label}</Text>
      <Text className="text-[13px] font-bold text-slate-900">{value}</Text>
    </View>
  );
}

interface ActionRowProps {
  icon: string;
  label: string;
  onPress: () => void;
}

function ActionRow({ icon, label, onPress }: ActionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mb-2 flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 active:opacity-80"
    >
      <View className="flex-row items-center gap-3">
        <Text className="text-lg">{icon}</Text>
        <Text className="text-[14px] font-semibold text-slate-800">{label}</Text>
      </View>
      <Text className="text-slate-400">›</Text>
    </Pressable>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const verified = user.verified;

  return (
    <View className="flex-1 bg-[#F1F5F9]">
      <StatusBar style="light" />
      <LinearGradient colors={['#0A1628', '#1A3C8F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SafeAreaView edges={['top']}>
          <View className="px-4 pb-5 pt-4">
            <Text className="font-display text-xl font-bold text-white">My Profile</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View className="items-center pb-5">
          <LinearGradient
            colors={['#3B82F6', '#1A3C8F']}
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: '#FFFFFF',
              shadowColor: COLORS.NAVY,
              shadowOpacity: 0.2,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 4,
            }}
          >
            <Text className="font-display text-2xl font-extrabold text-white">{user.avatar}</Text>
          </LinearGradient>
          <Text className="mt-3 font-display text-xl font-extrabold text-slate-900">{user.name}</Text>
          <View className="mt-2">
            <Badge
              label={verified ? '✓ Verified Resident' : '⏳ Pending Verification'}
              tone={verified ? 'green' : 'amber'}
            />
          </View>
        </View>

        <View className="rounded-2xl border border-slate-200 bg-white px-4">
          <InfoRow label="Mobile" value={formatPhone(user.phone)} />
          <InfoRow label="Purok" value={user.purok} />
          <InfoRow label="Birthday" value={user.birthday || '—'} />
          <InfoRow label="Gender" value={user.gender} last />
        </View>

        <View className="mt-4">
          <ActionRow
            icon="🪪"
            label="View Digital ID"
            onPress={() => router.push('/(tabs)/home/digital-id')}
          />
          <ActionRow
            icon="✅"
            label="Verify Identity"
            onPress={() =>
              router.push({
                pathname: '/(tabs)/home/coming-soon',
                params: { title: 'Identity Verification' },
              })
            }
          />
          <ActionRow
            icon="🔔"
            label="My Requests"
            onPress={() =>
              router.push({
                pathname: '/(tabs)/home/coming-soon',
                params: { title: 'Assistance' },
              })
            }
          />
        </View>

        <Pressable
          onPress={() => {
            logout();
            router.replace('/(auth)/welcome');
          }}
          accessibilityRole="button"
          className="mt-6 items-center py-3"
        >
          <Text className="text-[14px] font-bold text-[#DC2626]">Sign Out</Text>
        </Pressable>

        <Text className="mt-8 text-center text-[10px] text-slate-400">
          Joined {user.joined} · Cupang Love Connect
        </Text>
      </ScrollView>
    </View>
  );
}
