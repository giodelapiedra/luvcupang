import { View, Text } from 'react-native';
import { ScreenWrapper } from '@/components/layout';

export default function Account() {
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-brand-blue">Account</Text>
      </View>
    </ScreenWrapper>
  );
}
