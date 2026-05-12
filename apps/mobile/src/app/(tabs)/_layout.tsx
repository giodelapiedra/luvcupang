import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  focused: boolean;
  filled: IoniconName;
  outline: IoniconName;
  color: string;
}

function TabIcon({ focused, filled, outline, color }: TabIconProps) {
  return (
    <View className="items-center">
      <Ionicons name={focused ? filled : outline} size={22} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.BRAND,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          elevation: 0,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} filled="home" outline="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} filled="grid" outline="grid-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              filled="newspaper"
              outline="newspaper-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} filled="person" outline="person-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
