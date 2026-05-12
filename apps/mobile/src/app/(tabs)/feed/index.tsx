import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FEED, type FeedCategory } from '@/constants/feed';
import { FeedCard } from '@/components/home';

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
    <View className="flex-1 bg-[#F8FAFF]">
      <StatusBar style="light" />
      <LinearGradient colors={['#0A1628', '#1A3C8F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SafeAreaView edges={['top']}>
          <View className="px-4 pb-5 pt-4">
            <Text className="font-display text-2xl font-extrabold text-white">Cupang Feed</Text>
            <Text className="mt-1 text-xs text-white/70">
              Announcements, activities, and alerts from the barangay.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

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
                className={`rounded-full px-3 py-1.5 ${active ? 'bg-[#0A1628]' : 'bg-white border border-slate-200'}`}
              >
                <Text
                  className={`text-[12px] font-semibold ${active ? 'text-white' : 'text-slate-600'}`}
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
