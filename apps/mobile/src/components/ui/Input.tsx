import { useState } from 'react';
import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { COLORS } from '@/constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string | null;
  hint?: string;
}

export function Input({ label, error, hint, onBlur, onFocus, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? COLORS.RED : focused ? COLORS.ACCENT : COLORS.GRAY_200;

  return (
    <View className="w-full">
      {label ? <Text className="mb-1.5 text-sm font-semibold text-slate-700">{label}</Text> : null}
      <TextInput
        placeholderTextColor={COLORS.GRAY_400}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className="h-12 rounded-2xl border-[1.5px] bg-white px-4 text-base text-slate-900"
        style={{ borderColor }}
        {...rest}
      />
      {error ? (
        <Text className="ml-1 mt-1 text-xs font-medium text-red-600">{error}</Text>
      ) : hint ? (
        <Text className="ml-1 mt-1 text-xs text-slate-500">{hint}</Text>
      ) : null}
    </View>
  );
}
