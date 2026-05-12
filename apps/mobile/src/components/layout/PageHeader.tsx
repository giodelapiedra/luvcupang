import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { COLORS, GRADIENTS } from '@/constants/colors';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  right?: React.ReactNode;
  gradient?: readonly string[];
}

export function PageHeader({
  title,
  subtitle,
  onBack,
  showBack = true,
  right,
  gradient,
}: PageHeaderProps) {
  const router = useRouter();
  const colors = (gradient ?? GRADIENTS.NAVY_BRAND) as readonly [string, string, ...string[]];

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (router.canGoBack()) router.back();
  };

  return (
    <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View className="flex-row items-center justify-between px-4 pb-4 pt-3">
        <View className="flex-row items-center gap-3">
          {showBack ? (
            <Pressable
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="h-10 w-10 items-center justify-center rounded-full bg-white/15"
            >
              <Ionicons name="chevron-back" size={22} color={COLORS.WHITE} />
            </Pressable>
          ) : null}
          <View>
            <Text className="font-display text-lg font-bold text-white">{title}</Text>
            {subtitle ? <Text className="text-xs text-white/70">{subtitle}</Text> : null}
          </View>
        </View>
        {right ?? <View className="w-10" />}
      </View>
    </LinearGradient>
  );
}
