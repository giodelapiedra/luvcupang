import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      className={`flex-row items-center justify-between py-3 ${
        last ? '' : 'border-b border-slate-100'
      }`}
    >
      <Text className="text-[12px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </Text>
      <Text className="text-[13px] font-bold text-slate-900">{value}</Text>
    </View>
  );
}

interface ActionRowProps {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  description: string;
  onPress: () => void;
  tone?: 'default' | 'accent';
}

function ActionRow({ iconName, label, description, onPress, tone = 'default' }: ActionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mb-2 flex-row items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 active:opacity-80"
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: tone === 'accent' ? COLORS.ACCENT : '#EFF6FF' }}
      >
        <Ionicons name={iconName} size={20} color={tone === 'accent' ? '#FFFFFF' : COLORS.BRAND} />
      </View>
      <View className="flex-1">
        <Text className="text-[14px] font-semibold text-slate-900">{label}</Text>
        <Text className="text-[11px] text-slate-500">{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
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

      {/* Flat brand header */}
      <View style={{ backgroundColor: COLORS.BRAND }}>
        <SafeAreaView edges={['top']}>
          <View className="px-4 pb-5 pt-3">
            <Text className="font-display text-xl font-bold text-white">My Profile</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {/* Avatar block */}
        <View className="items-center pb-5">
          <LinearGradient
            colors={['#3B82F6', '#1A3C8F']}
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: '#FFFFFF',
              shadowColor: COLORS.NAVY,
              shadowOpacity: 0.18,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 6 },
              elevation: 4,
            }}
          >
            <Text className="font-display text-2xl font-extrabold text-white">{user.avatar}</Text>
          </LinearGradient>
          <Text className="mt-3 font-display text-xl font-extrabold text-slate-900">
            {user.name}
          </Text>
          <View className="mt-2 flex-row items-center gap-1.5">
            <Ionicons
              name={verified ? 'checkmark-circle' : 'time-outline'}
              size={14}
              color={verified ? COLORS.GREEN : COLORS.AMBER}
            />
            <Badge
              label={verified ? 'Verified Resident' : 'Pending Verification'}
              tone={verified ? 'green' : 'amber'}
            />
          </View>
        </View>

        {/* Info card */}
        <View className="rounded-2xl border border-slate-100 bg-white px-4">
          <InfoRow label="Mobile" value={formatPhone(user.phone)} />
          <InfoRow label="Purok" value={user.purok} />
          <InfoRow label="Birthday" value={user.birthday || '—'} />
          <InfoRow label="Gender" value={user.gender} last />
        </View>

        {/* Actions */}
        <View className="mt-5">
          <Text className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Identity
          </Text>
          <ActionRow
            iconName="card-outline"
            label="View Digital ID"
            description="Show your resident ID card"
            onPress={() => router.push('/(tabs)/home/digital-id')}
            tone="accent"
          />
          <ActionRow
            iconName="shield-checkmark-outline"
            label="Verify Identity"
            description="Upload a government ID to get verified"
            onPress={() =>
              router.push({
                pathname: '/(tabs)/home/coming-soon',
                params: { title: 'Identity Verification' },
              })
            }
          />
        </View>

        <View className="mt-5">
          <Text className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            My Activity
          </Text>
          <ActionRow
            iconName="document-text-outline"
            label="My Requests"
            description="Track your service requests"
            onPress={() =>
              router.push({
                pathname: '/(tabs)/home/coming-soon',
                params: { title: 'Assistance' },
              })
            }
          />
          <ActionRow
            iconName="notifications-outline"
            label="Notifications"
            description="Manage alerts and reminders"
            onPress={() =>
              router.push({
                pathname: '/(tabs)/home/coming-soon',
                params: { title: 'Service' },
              })
            }
          />
        </View>

        {/* Sign out */}
        <Pressable
          onPress={() => {
            logout();
            router.replace('/(auth)/welcome');
          }}
          accessibilityRole="button"
          className="mt-6 flex-row items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white py-3.5"
        >
          <Ionicons name="log-out-outline" size={18} color="#DC2626" />
          <Text className="text-[14px] font-bold text-[#DC2626]">Sign Out</Text>
        </Pressable>

        <Text className="mt-8 text-center text-[10px] text-slate-400">
          Joined {user.joined} · Cupang Love Connect
        </Text>
      </ScrollView>
    </View>
  );
}
