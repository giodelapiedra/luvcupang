import { Text, View } from 'react-native';
import type { FeedItem } from '@/constants/feed';

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  return (
    <View
      className="mb-3 rounded-2xl border border-slate-100 p-4"
      style={{ backgroundColor: item.bg }}
    >
      <View className="flex-row items-center justify-between">
        <View
          className="self-start rounded-full px-2.5 py-1"
          style={{ backgroundColor: item.tagBg }}
        >
          <Text className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: item.tagText }}>
            {item.tag}
          </Text>
        </View>
        <Text className="text-[11px] text-slate-500">{item.time}</Text>
      </View>
      <Text className="mt-2 font-display text-base font-bold text-slate-900">{item.title}</Text>
      <Text className="mt-1 text-[13px] leading-5 text-slate-600">{item.body}</Text>
    </View>
  );
}
