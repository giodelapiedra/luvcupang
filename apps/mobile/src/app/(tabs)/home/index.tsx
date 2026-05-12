import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

  if (!user) return null; // AuthGuard handles the redirect.

  return (
    <View className="flex-1 bg-[#F8FAFF]">
      <StatusBar style="light" />

      <LinearGradient colors={['#0A1628', '#1A3C8F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SafeAreaView edges={['top']}>
          <View className="flex-row items-center justify-between px-4 pb-4 pt-3">
            <View className="flex-row items-center gap-3">
              <View
                className="h-10 w-10 items-center justify-center rounded-2xl border border-white/30"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <Text className="font-display text-sm font-extrabold text-white">LC</Text>
              </View>
              <View>
                <Text className="font-display text-[15px] font-extrabold text-white">
                  Cupang Love Connect
                </Text>
                <Text className="text-[12px] text-white/70">
                  Good {greetingWord}, {user.firstName}! 👋
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
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-4 pt-4">
          <IDBanner verified={user.verified} fullName={user.name} />
        </View>

        <View className="px-4 pt-6">
          <View className="mb-3 flex-row items-end justify-between">
            <Text className="font-display text-lg font-extrabold text-slate-900">Services</Text>
            <Text className="text-[11px] text-slate-500">Tap to explore</Text>
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

        <View className="px-4 pt-6">
          <View className="mb-2 flex-row items-end justify-between">
            <Text className="font-display text-lg font-extrabold text-slate-900">Cupang Feed</Text>
            <Text className="text-[11px] text-slate-500">Stay informed</Text>
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
                  className={`rounded-full px-3 py-1.5 ${active ? 'bg-[#0A1628]' : 'bg-white border border-slate-200'}`}
                >
                  <Text className={`text-[12px] font-semibold ${active ? 'text-white' : 'text-slate-600'}`}>
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
