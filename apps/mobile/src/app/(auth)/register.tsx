import { View, Text } from 'react-native';
import { ScreenWrapper } from '@/components/layout';

export default function Register() {
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-brand-blue">Register</Text>
        <Text className="mt-2 text-sm text-slate-500">Phase 1 placeholder.</Text>
      </View>
    </ScreenWrapper>
  );
}
