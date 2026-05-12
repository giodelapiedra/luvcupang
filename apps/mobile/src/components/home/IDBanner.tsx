import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';

interface IDBannerProps {
  verified: boolean;
  fullName: string;
}

// QR-style 5x5 dot grid (random opacity) — pure decoration, not a real scannable code.
function MiniQR() {
  const dots = Array.from({ length: 25 }, (_, i) => ({
    key: i,
    opacity: 0.3 + Math.random() * 0.7,
  }));
  return (
    <View className="h-12 w-12 flex-row flex-wrap justify-between rounded-md bg-white/10 p-1">
      {dots.map((d) => (
        <View
          key={d.key}
          className="rounded-sm bg-white"
          style={{ width: 6, height: 6, opacity: d.opacity }}
        />
      ))}
    </View>
  );
}

export function IDBanner({ verified, fullName }: IDBannerProps) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push('/(tabs)/home/digital-id')} accessibilityRole="button">
      <LinearGradient
        colors={['#1A3C8F', '#2563EB', '#3B82F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          padding: 16,
          shadowColor: COLORS.ACCENT,
          shadowOpacity: 0.35,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 6,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <View
              className="self-start rounded-full px-2 py-0.5"
              style={{ backgroundColor: verified ? 'rgba(22,163,74,0.25)' : 'rgba(217,119,6,0.3)' }}
            >
              <Text className="text-[10px] font-bold uppercase tracking-wider text-white">
                {verified ? '✓ Verified' : '⏳ Not Yet Verified'}
              </Text>
            </View>
            <Text className="mt-2 font-display text-lg font-extrabold text-white">
              Your Digital ID
            </Text>
            <Text className="text-xs text-white/80" numberOfLines={1}>
              {fullName} · tap to view full ID
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MiniQR />
            <Ionicons name="chevron-forward" size={20} color={COLORS.WHITE} />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
