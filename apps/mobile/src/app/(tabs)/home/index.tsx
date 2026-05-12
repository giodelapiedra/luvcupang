import { View, Text } from 'react-native';
import { ScreenWrapper } from '@/components/layout';
import { Card } from '@/components/ui';

export default function Home() {
  return (
    <ScreenWrapper>
      <Text className="text-2xl font-bold text-brand-blue">Home</Text>
      <Text className="mb-4 mt-1 text-sm text-slate-500">Cupang Love Connect</Text>
      <Card>
        <View className="gap-1">
          <Text className="text-base font-semibold text-slate-900">Phase 0 baseline</Text>
          <Text className="text-sm text-slate-600">
            This is a placeholder screen. Real Home content lands in Phase 1+.
          </Text>
        </View>
      </Card>
    </ScreenWrapper>
  );
}
