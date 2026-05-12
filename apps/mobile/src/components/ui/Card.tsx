import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface CardProps {
  className?: string;
}

export function Card({ children, className = '' }: PropsWithChildren<CardProps>) {
  return (
    <View
      className={`rounded-2xl bg-white p-4 shadow-sm shadow-black/10 ${className}`}
      style={{ elevation: 2 }}
    >
      {children}
    </View>
  );
}
