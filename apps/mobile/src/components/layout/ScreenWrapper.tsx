import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface ScreenWrapperProps {
  className?: string;
}

export function ScreenWrapper({ children, className = '' }: PropsWithChildren<ScreenWrapperProps>) {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <View className={`flex-1 px-4 py-3 ${className}`}>{children}</View>
    </SafeAreaView>
  );
}
