import type { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ children, className = '', style, ...rest }: PropsWithChildren<CardProps>) {
  return (
    <View
      className={`rounded-2xl bg-white p-4 ${className}`}
      style={[
        {
          shadowColor: '#0A1628',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
