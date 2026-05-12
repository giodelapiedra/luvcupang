import { Pressable, Text, View } from 'react-native';
import type { ServiceItem } from '@/constants/services';

interface ServiceCardProps {
  service: ServiceItem;
  onPress: () => void;
}

// One cell in the 4-column home grid. Tap → Coming Soon screen.
export function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={service.label}
      onPress={onPress}
      className="items-center rounded-2xl border p-3 active:opacity-80"
      style={{ backgroundColor: service.color, borderColor: service.border, width: '23%' }}
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: service.iconBg }}
      >
        <Text className="text-lg">{service.icon}</Text>
      </View>
      <Text className="mt-2 text-center text-[11px] font-bold text-slate-900" numberOfLines={1}>
        {service.label}
      </Text>
      <Text className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
        Coming Soon
      </Text>
    </Pressable>
  );
}
