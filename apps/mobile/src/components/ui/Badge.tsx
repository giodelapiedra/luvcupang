import { Text, View } from 'react-native';

type Tone = 'green' | 'amber' | 'red' | 'blue' | 'gray';

const tones: Record<Tone, { bg: string; text: string }> = {
  green: { bg: 'bg-[#DCFCE7]', text: 'text-[#15803D]' },
  amber: { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
  red: { bg: 'bg-[#FEE2E2]', text: 'text-[#B91C1C]' },
  blue: { bg: 'bg-[#DBEAFE]', text: 'text-[#1D4ED8]' },
  gray: { bg: 'bg-[#F1F5F9]', text: 'text-[#475569]' },
};

interface BadgeProps {
  label: string;
  tone?: Tone;
  className?: string;
}

export function Badge({ label, tone = 'gray', className = '' }: BadgeProps) {
  const t = tones[tone];
  return (
    <View className={`self-start rounded-full px-2.5 py-1 ${t.bg} ${className}`}>
      <Text className={`text-[10px] font-bold uppercase tracking-wider ${t.text}`}>{label}</Text>
    </View>
  );
}
