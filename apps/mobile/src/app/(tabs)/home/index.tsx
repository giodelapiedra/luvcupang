import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/colors';
import { SERVICES } from '@/constants/services';
import { FEED, type FeedCategory } from '@/constants/feed';
import { greeting } from '@/utils/format';
import { ServiceCard, FeedCard, IDBanner } from '@/components/home';

type Tab = 'all' | FeedCategory;

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'announcement', label: 'Announcements' },
  { id: 'activity', label: 'Activities' },
  { id: 'alert', label: 'Alerts' },
];

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const greetingWord = greeting();

  const visibleFeed = useMemo(
    () => (activeTab === 'all' ? FEED : FEED.filter((f) => f.category === activeTab)),
    [activeTab]
  );

  if (!user) return null;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="light" />

      {/* Flat solid brand-blue header */}
      <View style={{ backgroundColor: COLORS.BRAND }}>
        <SafeAreaView edges={['top']}>
          <View className="flex-row items-center justify-between px-4 pb-5 pt-3">
            <View className="flex-1 flex-row items-center gap-3">
              <View
                className="h-10 w-10 items-center justify-center rounded-xl border border-white/20"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              >
                <Text className="font-display text-sm font-extrabold text-white">LC</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[11px] uppercase tracking-wider text-white/60">
                  Good {greetingWord}
                </Text>
                <Text className="font-display text-base font-extrabold text-white" numberOfLines={1}>
                  {user.firstName} {user.lastName}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => router.push('/(tabs)/account')}
              accessibilityLabel="View profile"
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: COLORS.ACCENT }}
            >
              <Text className="font-display text-sm font-extrabold text-white">{user.avatar}</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* ID banner — pulled up over header edge */}
        <View className="px-4" style={{ marginTop: -8 }}>
          <IDBanner verified={user.verified} fullName={user.name} />
        </View>

        {/* Services */}
        <View className="px-4 pt-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-display text-base font-extrabold text-slate-900">Services</Text>
            <Pressable
              onPress={() => router.push('/(tabs)/services')}
              className="flex-row items-center gap-1"
              accessibilityRole="button"
            >
              <Text className="text-[12px] font-semibold text-[#2563EB]">See all</Text>
              <Ionicons name="chevron-forward" size={12} color="#2563EB" />
            </Pressable>
          </View>
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/home/coming-soon',
                    params: { title: s.label },
                  })
                }
              />
            ))}
          </View>
        </View>

        {/* Feed */}
        <View className="px-4 pt-7">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="font-display text-base font-extrabold text-slate-900">
              Cupang Feed
            </Text>
            <Pressable
              onPress={() => router.push('/(tabs)/feed')}
              accessibilityRole="button"
              className="flex-row items-center gap-1"
            >
              <Text className="text-[12px] font-semibold text-[#2563EB]">View all</Text>
              <Ionicons name="chevron-forward" size={12} color="#2563EB" />
            </Pressable>
          </View>

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

          {visibleFeed.length === 0 ? (
            <Text className="py-6 text-center text-sm text-slate-500">
              No posts in this category yet.
            </Text>
          ) : (
            visibleFeed.map((item) => <FeedCard key={item.id} item={item} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
}
