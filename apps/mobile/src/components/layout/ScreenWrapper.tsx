import type { PropsWithChildren } from 'react';
import { ScrollView, View, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface ScreenWrapperProps {
  scroll?: boolean;
  background?: string;
  edges?: Array<'top' | 'left' | 'right' | 'bottom'>;
  className?: string;
  contentClassName?: string;
  statusBarStyle?: 'auto' | 'dark' | 'light';
  scrollProps?: ScrollViewProps;
}

export function ScreenWrapper({
  children,
  scroll = false,
  background = '#F8FAFF',
  edges = ['top', 'left', 'right'],
  className = '',
  contentClassName = '',
  statusBarStyle = 'dark',
  scrollProps,
}: PropsWithChildren<ScreenWrapperProps>) {
  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: background }} className={className}>
      <StatusBar style={statusBarStyle} />
      {scroll ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
        >
          <View className={`flex-1 ${contentClassName}`}>{children}</View>
        </ScrollView>
      ) : (
        <View className={`flex-1 ${contentClassName}`}>{children}</View>
      )}
    </SafeAreaView>
  );
}
