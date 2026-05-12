import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button, Input, Select } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { GENDER_OPTIONS, PUROK_OPTIONS } from '@/constants/config';
import { COLORS } from '@/constants/colors';
import { validateName, validatePhone, stripNonDigits, validateRequired } from '@/utils/validation';
import { getInitials, joinedNow } from '@/utils/format';
import type { User } from '@/types/user.types';

type Step = 1 | 2;

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  purok: string;
  birthday: string;
  gender: string;
}

type Errors = Partial<Record<keyof FormData, string | null>>;

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    purok: '',
    birthday: '',
    gender: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: null }));
  };

  const validateStep1 = (): boolean => {
    const next: Errors = {
      firstName: validateName(data.firstName),
      lastName: validateName(data.lastName),
      phone: validatePhone(data.phone),
    };
    setErrors(next);
    return !next.firstName && !next.lastName && !next.phone;
  };

  const validateStep2 = (): boolean => {
    const next: Errors = {
      purok: validateRequired(data.purok, 'Purok'),
      birthday: validateRequired(data.birthday, 'Birthday'),
      gender: validateRequired(data.gender, 'Gender'),
    };
    setErrors(next);
    return !next.purok && !next.birthday && !next.gender;
  };

  const onContinue = () => {
    if (validateStep1()) setStep(2);
  };

  const onSubmit = () => {
    if (!validateStep2()) return;
    const user: User = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
      phone: data.phone,
      purok: data.purok,
      birthday: data.birthday,
      gender: data.gender,
      avatar: getInitials(data.firstName, data.lastName),
      role: 'RESIDENT',
      verificationStatus: 'UNVERIFIED',
      verified: false,
      joined: joinedNow(),
    };
    login(user);
    router.replace('/(tabs)/home');
  };

  const onBack = () => {
    if (step === 2) setStep(1);
    else if (router.canGoBack()) router.back();
  };

  const onDatePicked = (event: DateTimePickerEvent, selected?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (event.type === 'dismissed' || !selected) return;
    const iso = selected.toISOString().slice(0, 10);
    update('birthday', iso);
  };

  return (
    <View className="flex-1 bg-[#F8FAFF]">
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient
        colors={['#0A1628', '#1A3C8F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <View className="px-4 pb-5 pt-2">
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={onBack}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                className="h-10 w-10 items-center justify-center rounded-full bg-white/15"
              >
                <Ionicons name="chevron-back" size={22} color={COLORS.WHITE} />
              </Pressable>
              <View className="flex-row gap-1.5">
                <View
                  className="h-2 rounded-full"
                  style={{ width: step >= 1 ? 24 : 8, backgroundColor: 'white' }}
                />
                <View
                  className="h-2 rounded-full"
                  style={{
                    width: step >= 2 ? 24 : 8,
                    backgroundColor: step >= 2 ? 'white' : 'rgba(255,255,255,0.35)',
                  }}
                />
              </View>
              <View className="w-10" />
            </View>

            <Text className="mt-3 font-display text-2xl font-extrabold text-white">
              {step === 1 ? 'Create Account' : 'Your Details'}
            </Text>
            <Text className="mt-1 text-xs text-white/70">Step {step} of 2</Text>
          </View>

          {/* Progress bar */}
          <View className="h-1 w-full bg-white/15">
            <View
              className="h-1 rounded-r-full bg-[#3B82F6]"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Intro box */}
          <View className="mb-5 flex-row items-center gap-3 rounded-2xl bg-[#EFF6FF] p-3.5">
            <Text className="text-xl">{step === 1 ? '👤' : '🏠'}</Text>
            <Text className="flex-1 text-[12px] leading-4 text-[#1D4ED8]">
              {step === 1
                ? 'Tell us your name and mobile number. We use this to set up your account.'
                : 'Where in Brgy. Cupang do you live? These details appear on your Digital ID.'}
            </Text>
          </View>

          {step === 1 ? (
            <View className="gap-4">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Input
                    label="First Name"
                    placeholder="Juan"
                    value={data.firstName}
                    onChangeText={(v) => update('firstName', v)}
                    error={errors.firstName ?? null}
                    autoCapitalize="words"
                  />
                </View>
                <View className="flex-1">
                  <Input
                    label="Last Name"
                    placeholder="Dela Cruz"
                    value={data.lastName}
                    onChangeText={(v) => update('lastName', v)}
                    error={errors.lastName ?? null}
                    autoCapitalize="words"
                  />
                </View>
              </View>
              <Input
                label="Mobile Number"
                placeholder="09XX-XXX-XXXX"
                value={data.phone}
                onChangeText={(v) => update('phone', stripNonDigits(v).slice(0, 11))}
                error={errors.phone ?? null}
                keyboardType="phone-pad"
                maxLength={11}
              />
              <View className="mt-3">
                <Button label="Continue →" onPress={onContinue} />
              </View>
            </View>
          ) : (
            <View className="gap-4">
              <Select
                label="Purok"
                placeholder="Select your purok"
                value={data.purok}
                options={PUROK_OPTIONS}
                onChange={(v) => update('purok', v)}
                error={errors.purok ?? null}
              />

              <View>
                <Text className="mb-1.5 text-sm font-semibold text-slate-700">Birthday</Text>
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  className="h-12 flex-row items-center justify-between rounded-2xl border-[1.5px] bg-white px-4"
                  style={{ borderColor: errors.birthday ? COLORS.RED : COLORS.GRAY_200 }}
                >
                  <Text className={`text-base ${data.birthday ? 'text-slate-900' : 'text-slate-400'}`}>
                    {data.birthday || 'Select your birthday'}
                  </Text>
                  <Ionicons name="calendar-outline" size={18} color={COLORS.GRAY_400} />
                </Pressable>
                {errors.birthday ? (
                  <Text className="ml-1 mt-1 text-xs font-medium text-red-600">{errors.birthday}</Text>
                ) : null}
                {showDatePicker ? (
                  <DateTimePicker
                    value={data.birthday ? new Date(data.birthday) : new Date(2000, 0, 1)}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={new Date()}
                    onChange={onDatePicked}
                  />
                ) : null}
              </View>

              <Select
                label="Gender"
                placeholder="Select"
                value={data.gender}
                options={GENDER_OPTIONS}
                onChange={(v) => update('gender', v)}
                error={errors.gender ?? null}
              />

              <Text className="mt-1 text-[11px] leading-4 text-slate-500">
                By tapping Create My Account, you agree to the collection and use of your personal
                information in line with the Data Privacy Act of 2012 (RA 10173). Your details are
                used only for barangay services.
              </Text>

              <View className="mt-3">
                <Button label="Create My Account ✓" onPress={onSubmit} />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
