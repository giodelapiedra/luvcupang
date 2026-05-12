import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { FeedItem } from '@/constants/feed';

interface FeedCardProps {
  item: FeedItem;
}

const CATEGORY_META: Record<
  FeedItem['category'],
  { iconName: React.ComponentProps<typeof Ionicons>['name']; color: string; label: string }
> = {
  alert: { iconName: 'alert-circle-outline', color: '#DC2626', label: 'Alert' },
  announcement: { iconName: 'megaphone-outline', color: '#2563EB', label: 'Announcement' },
  activity: { iconName: 'calendar-outline', color: '#16A34A', label: 'Activity' },
};

// Flat card: white background, colored 3-px left edge for category,
// outline icon, bold title, body. No tinted backgrounds.
export function FeedCard({ item }: FeedCardProps) {
  const meta = CATEGORY_META[item.category];
  return (
    <View
      className="mb-3 overflow-hidden rounded-2xl border border-slate-100 bg-white"
      style={{
        shadowColor: '#0A1628',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
      }}
    >
      <View className="flex-row">
        <View style={{ width: 3, backgroundColor: meta.color }} />
        <View className="flex-1 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name={meta.iconName} size={14} color={meta.color} />
              <Text
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: meta.color }}
              >
                {meta.label}
              </Text>
            </View>
            <Text className="text-[11px] text-slate-400">{item.time}</Text>
          </View>
          <Text className="mt-2 text-[15px] font-bold text-slate-900">{item.title}</Text>
          <Text className="mt-1 text-[13px] leading-5 text-slate-600">{item.body}</Text>
        </View>
      </View>
    </View>
  );
}
