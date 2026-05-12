import { Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: Variant;
}

const variantStyles: Record<Variant, { bg: string; text: string; border: string }> = {
  primary: { bg: 'bg-brand-blue', text: 'text-white', border: 'border-brand-blue' },
  secondary: { bg: 'bg-white', text: 'text-brand-blue', border: 'border-brand-blue' },
  outline: { bg: 'bg-transparent', text: 'text-brand-blue', border: 'border-brand-blue' },
};

export function Button({ label, variant = 'primary', disabled, ...rest }: ButtonProps) {
  const v = variantStyles[variant];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={`${v.bg} ${v.border} h-12 items-center justify-center rounded-xl border px-6 ${
        disabled ? 'opacity-50' : 'active:opacity-80'
      }`}
      {...rest}
    >
      <Text className={`${v.text} text-base font-semibold`}>{label}</Text>
    </Pressable>
  );
}
