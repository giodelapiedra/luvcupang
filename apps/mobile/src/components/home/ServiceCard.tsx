import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ServiceItem } from '@/constants/services';

interface ServiceCardProps {
  service: ServiceItem;
  onPress: () => void;
}

// 4-up flat card: white background, single colored icon tile, clean label.
// No emoji, no gradient — eGov-style.
export function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={service.label}
      onPress={onPress}
      className="items-center rounded-2xl border border-slate-100 bg-white px-2 py-3 active:opacity-80"
      style={{ width: '23%' }}
    >
      <View
        className="h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: service.accent }}
      >
        <Ionicons name={service.iconName} size={22} color="#FFFFFF" />
      </View>
      <Text className="mt-2 text-center text-[12px] font-semibold text-slate-800" numberOfLines={1}>
        {service.label}
      </Text>
    </Pressable>
  );
}
