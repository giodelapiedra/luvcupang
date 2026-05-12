import { useState } from 'react';
import { Modal, Pressable, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

interface SelectProps {
  label?: string;
  value: string;
  placeholder?: string;
  options: string[];
  onChange: (v: string) => void;
  error?: string | null;
}

export function Select({ label, value, placeholder = 'Select…', options, onChange, error }: SelectProps) {
  const [open, setOpen] = useState(false);
  const borderColor = error ? COLORS.RED : COLORS.GRAY_200;

  return (
    <View className="w-full">
      {label ? <Text className="mb-1.5 text-sm font-semibold text-slate-700">{label}</Text> : null}

      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen(true)}
        className="h-12 flex-row items-center justify-between rounded-2xl border-[1.5px] bg-white px-4"
        style={{ borderColor }}
      >
        <Text className={`text-base ${value ? 'text-slate-900' : 'text-slate-400'}`}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={COLORS.GRAY_400} />
      </Pressable>

      {error ? <Text className="ml-1 mt-1 text-xs font-medium text-red-600">{error}</Text> : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          className="flex-1 items-center justify-center bg-black/40 px-6"
          onPress={() => setOpen(false)}
        >
          <Pressable className="max-h-[60%] w-full rounded-2xl bg-white p-2" onPress={() => undefined}>
            <View className="px-3 pb-2 pt-3">
              <Text className="text-base font-bold text-slate-900">{label ?? 'Select an option'}</Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const active = item === value;
                return (
                  <Pressable
                    onPress={() => {
                      onChange(item);
                      setOpen(false);
                    }}
                    className={`flex-row items-center justify-between rounded-xl px-3 py-3 ${
                      active ? 'bg-[#EFF6FF]' : ''
                    }`}
                  >
                    <Text className={`text-base ${active ? 'font-semibold text-[#1A3C8F]' : 'text-slate-700'}`}>
                      {item}
                    </Text>
                    {active ? <Ionicons name="checkmark" size={18} color={COLORS.BRAND} /> : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
