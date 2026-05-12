import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  right?: React.ReactNode;
  background?: string;
}

// Flat solid header — single brand color, no gradient. Cleaner against the
// flat card-based body. Pulls in safe-area inset so it works on iOS notches.
export function PageHeader({
  title,
  subtitle,
  onBack,
  showBack = true,
  right,
  background = COLORS.BRAND,
}: PageHeaderProps) {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (router.canGoBack()) router.back();
  };

  return (
    <View style={{ backgroundColor: background }}>
      <SafeAreaView edges={['top']}>
        <View className="flex-row items-center justify-between px-4 pb-4 pt-3">
          <View className="flex-1 flex-row items-center gap-3">
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
            <View className="flex-1">
              <Text
                className="font-display text-lg font-bold text-white"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
              {subtitle ? (
                <Text className="text-xs text-white/70" numberOfLines={1}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </View>
          {right ?? <View className="w-10" />}
        </View>
      </SafeAreaView>
    </View>
  );
}
