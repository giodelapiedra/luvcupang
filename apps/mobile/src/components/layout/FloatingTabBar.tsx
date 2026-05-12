import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { COLORS } from '@/constants/colors';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabMeta {
  filled: IoniconName;
  outline: IoniconName;
  label: string;
}

const TAB_META: Record<string, TabMeta> = {
  home: { filled: 'home', outline: 'home-outline', label: 'Home' },
  services: { filled: 'grid', outline: 'grid-outline', label: 'Services' },
  feed: { filled: 'newspaper', outline: 'newspaper-outline', label: 'Feed' },
  account: { filled: 'person', outline: 'person-outline', label: 'Account' },
};

// Order in the floating bar — the literal string 'id' is the virtual center
// button (NOT an expo-router route). Tap → push to digital-id detail.
const BAR_ORDER: Array<'home' | 'services' | 'id' | 'feed' | 'account'> = [
  'home',
  'services',
  'id',
  'feed',
  'account',
];

function TabButton({
  meta,
  focused,
  onPress,
  onLongPress,
}: {
  meta: TabMeta;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={focused ? { selected: true } : {}}
      accessibilityLabel={meta.label}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center py-1.5"
    >
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 3,
          marginBottom: 3,
          backgroundColor: focused ? COLORS.ACCENT : 'transparent',
        }}
      />
      <Ionicons
        name={focused ? meta.filled : meta.outline}
        size={22}
        color={focused ? COLORS.ACCENT : '#94A3B8'}
      />
      <Text
        className="mt-0.5 text-[10px] font-semibold"
        style={{ color: focused ? COLORS.ACCENT : '#94A3B8' }}
      >
        {meta.label}
      </Text>
    </Pressable>
  );
}

// Elevated center button — Digital ID shortcut. Sits above the bar line
// with its own white circular tile and shadow.
function CenterIDButton({ onPress }: { onPress: () => void }) {
  return (
    <View className="items-center justify-center" style={{ width: 64 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Digital ID"
        onPress={onPress}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -28, // lifts the circle above the bar's top edge
          shadowColor: COLORS.ACCENT,
          shadowOpacity: 0.35,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
          borderWidth: 4,
          borderColor: '#FFFFFF',
        }}
      >
        <View
          className="h-full w-full items-center justify-center rounded-full"
          style={{ backgroundColor: '#EFF6FF' }}
        >
          <Ionicons name="heart" size={22} color={COLORS.ACCENT} />
        </View>
      </Pressable>
      <Text
        className="mt-1 text-[10px] font-semibold"
        style={{ color: COLORS.ACCENT }}
      >
        My ID
      </Text>
    </View>
  );
}

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Map registered routes by name for fast lookup.
  const routesByName = Object.fromEntries(state.routes.map((r, i) => [r.name, { route: r, index: i }]));

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: Math.max(insets.bottom, 12),
        alignItems: 'center',
      }}
    >
      <View
        className="flex-row items-end justify-between rounded-full bg-white px-4"
        style={{
          minWidth: '90%',
          paddingTop: 10,
          paddingBottom: 10,
          shadowColor: '#0A1628',
          shadowOpacity: 0.18,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 10,
          borderWidth: 1,
          borderColor: 'rgba(15,23,42,0.06)',
        }}
      >
        {BAR_ORDER.map((slot) => {
          if (slot === 'id') {
            return (
              <CenterIDButton
                key="id"
                onPress={() => router.push('/(tabs)/home/digital-id')}
              />
            );
          }

          const entry = routesByName[slot];
          const meta = TAB_META[slot];
          if (!entry || !meta) return null;

          const { route, index } = entry;
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          return (
            <TabButton
              key={route.key}
              meta={meta}
              focused={focused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}
