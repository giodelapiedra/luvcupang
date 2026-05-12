// NativeWind v4 augments React Native types via the underlying
// react-native-css-interop package. Some TS versions don't auto-pick up its
// declarations, so we re-declare the className prop here as a belt-and-braces
// fallback.
import 'react-native-css-interop/types';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface ImagePropsBase {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
    contentContainerClassName?: string;
  }
  interface SwitchProps {
    className?: string;
  }
}
