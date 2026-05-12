import { Component, type ErrorInfo, type PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';

interface State {
  error: Error | null;
}

// Minimal class-based ErrorBoundary. We rolled our own instead of pulling in
// react-native-error-boundary because that package's latest version requires
// react-native-safe-area-context >= 5, but Expo SDK 51 ships with 4.10.x.
export class ErrorBoundary extends Component<PropsWithChildren<unknown>, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <View className="flex-1 items-center justify-center bg-[#0A1628] px-6">
        <Text className="text-3xl">😕</Text>
        <Text className="mt-3 font-display text-xl font-bold text-white">Something went wrong</Text>
        <Text className="mt-2 text-center text-sm text-white/70">
          The app hit an unexpected error. Tap below to try again.
        </Text>
        <Pressable
          onPress={this.reset}
          className="mt-6 h-12 items-center justify-center rounded-2xl bg-[#2563EB] px-6"
        >
          <Text className="text-base font-semibold text-white">Tap to reload</Text>
        </Pressable>
        {__DEV__ ? (
          <Text className="mt-4 px-4 text-center text-[10px] text-white/40">
            {this.state.error.message}
          </Text>
        ) : null}
      </View>
    );
  }
}
