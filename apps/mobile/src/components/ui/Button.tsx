import { ActivityIndicator, Pressable, Text, View, type PressableProps } from 'react-native';
import { COLORS } from '@/constants/colors';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

const styles: Record<Variant, { bg: string; text: string; border: string }> = {
  primary: { bg: 'bg-[#2563EB]', text: 'text-white', border: 'border-[#2563EB]' },
  secondary: { bg: 'bg-white', text: 'text-[#1A3C8F]', border: 'border-[#1A3C8F]' },
  outline: { bg: 'bg-transparent', text: 'text-[#1A3C8F]', border: 'border-[#CBD5E1]' },
  ghost: { bg: 'bg-transparent', text: 'text-[#475569]', border: 'border-transparent' },
  danger: { bg: 'bg-[#DC2626]', text: 'text-white', border: 'border-[#DC2626]' },
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  fullWidth = true,
  ...rest
}: ButtonProps) {
  const v = styles[variant];
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={`${v.bg} ${v.border} ${
        fullWidth ? 'w-full' : ''
      } h-12 flex-row items-center justify-center rounded-2xl border px-6 ${
        isDisabled ? 'opacity-50' : 'active:opacity-80'
      }`}
      style={
        variant === 'primary' && !isDisabled
          ? {
              shadowColor: COLORS.ACCENT,
              shadowOpacity: 0.3,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 4,
            }
          : undefined
      }
      {...rest}
    >
      {loading ? (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator size="small" color={variant === 'primary' || variant === 'danger' ? '#fff' : COLORS.BRAND} />
          <Text className={`${v.text} text-base font-semibold`}>Please wait…</Text>
        </View>
      ) : (
        <Text className={`${v.text} text-base font-semibold`}>{label}</Text>
      )}
    </Pressable>
  );
}
