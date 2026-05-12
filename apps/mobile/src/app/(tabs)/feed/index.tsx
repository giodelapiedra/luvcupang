import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FEED, type FeedCategory } from '@/constants/feed';
import { FeedCard } from '@/components/home';
import { COLORS } from '@/constants/colors';

type Tab = 'all' | FeedCategory;

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'announcement', label: 'Announcements' },
  { id: 'activity', label: 'Activities' },
  { id: 'alert', label: 'Alerts' },
];

export default function Feed() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const visible = useMemo(
    () => (activeTab === 'all' ? FEED : FEED.filter((f) => f.category === activeTab)),
    [activeTab]
  );

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="light" />

      <View style={{ backgroundColor: COLORS.BRAND }}>
        <SafeAreaView edges={['top']}>
          <View className="px-4 pb-5 pt-3">
            <Text className="font-display text-2xl font-extrabold text-white">Cupang Feed</Text>
            <Text className="mt-1 text-xs text-white/70">
              Announcements, activities, and alerts from the barangay.
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-1 mb-3"
          contentContainerStyle={{ paddingHorizontal: 4, gap: 8 }}
        >
          {TABS.map((t) => {
            const active = t.id === activeTab;
            return (
              <Pressable
                key={t.id}
                onPress={() => setActiveTab(t.id)}
                className={`rounded-full px-3.5 py-1.5 ${
                  active ? 'bg-slate-900' : 'border border-slate-200 bg-white'
                }`}
              >
                <Text
                  className={`text-[12px] font-semibold ${
                    active ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {visible.length === 0 ? (
          <Text className="py-6 text-center text-sm text-slate-500">
            No posts in this category yet.
          </Text>
        ) : (
          visible.map((item) => <FeedCard key={item.id} item={item} />)
        )}
      </ScrollView>
    </View>
  );
}
