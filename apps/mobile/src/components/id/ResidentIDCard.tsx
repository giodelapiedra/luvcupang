import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { User } from '@/types/user.types';
import { generateIdNumber } from '@/utils/format';

interface ResidentIDCardProps {
  user: User;
}

function QRDotGrid({ size = 64, cells = 7 }: { size?: number; cells?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: cells * cells }, (_, i) => ({
        key: i,
        opacity: 0.35 + Math.random() * 0.65,
      })),
    [cells]
  );
  const dotSize = (size - 8) / cells;
  return (
    <View
      style={{ width: size, height: size, padding: 4 }}
      className="flex-row flex-wrap justify-between rounded-md bg-white/10"
    >
      {dots.map((d) => (
        <View
          key={d.key}
          className="rounded-[1px] bg-white"
          style={{ width: dotSize - 1, height: dotSize - 1, opacity: d.opacity }}
        />
      ))}
    </View>
  );
}

export function ResidentIDCard({ user }: ResidentIDCardProps) {
  const idNumber = useMemo(() => user.id ?? generateIdNumber(), [user.id]);

  const verified = user.verified;
  const statusLabel = verified ? 'VERIFIED RESIDENT' : 'PENDING VERIFICATION';
  const statusBg = verified ? 'rgba(34,197,94,0.18)' : 'rgba(245,158,11,0.20)';

  return (
    <LinearGradient
      colors={['#0A1628', '#1A3C8F', '#1E40AF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 22,
        padding: 20,
        shadowColor: '#0A1628',
        shadowOpacity: 0.35,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 6,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <Text className="font-display text-base font-extrabold text-white">LC</Text>
        </View>
        <View className="flex-1">
          <Text className="font-display text-[13px] font-bold uppercase tracking-wider text-white">
            CUPANG LOVE CONNECT
          </Text>
          <Text className="text-[10px] text-white/70">Brgy. Cupang, Muntinlupa City</Text>
        </View>
      </View>

      {/* Body */}
      <View className="mt-5 flex-row items-center gap-4">
        <LinearGradient
          colors={['#3B82F6', '#1A3C8F']}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'rgba(255,255,255,0.4)',
          }}
        >
          <Text className="font-display text-lg font-extrabold text-white">{user.avatar}</Text>
        </LinearGradient>
        <View className="flex-1">
          <Text className="font-display text-base font-extrabold text-white" numberOfLines={1}>
            {user.name}
          </Text>
          <Text className="text-[11px] text-white/80">{user.purok}</Text>
          <Text className="text-[11px] text-white/70">{user.phone}</Text>
          <View
            className="mt-1.5 flex-row items-center gap-1 self-start rounded-full border border-white/30 px-2 py-0.5"
            style={{ backgroundColor: statusBg }}
          >
            <Ionicons
              name={verified ? 'checkmark-circle' : 'time-outline'}
              size={10}
              color="#FFFFFF"
            />
            <Text className="text-[9px] font-extrabold tracking-wider text-white">
              {statusLabel}
            </Text>
          </View>
        </View>
      </View>

      {/* QR row */}
      <View
        className="mt-5 flex-row items-center gap-3 rounded-xl p-3"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
      >
        <QRDotGrid />
        <View className="flex-1">
          <Text className="text-[10px] uppercase tracking-wider text-white/60">ID No.</Text>
          <Text className="font-display text-sm font-extrabold text-white">{idNumber}</Text>
          <Text className="mt-1 text-[10px] text-white/70">Joined {user.joined}</Text>
          <Text className="mt-0.5 text-[9px] text-white/50">Scan to verify</Text>
        </View>
      </View>

      <Text className="mt-4 text-center text-[9px] text-white/50">
        This certifies that the above-named is a registered resident of Brgy. Cupang.
      </Text>
    </LinearGradient>
  );
}
