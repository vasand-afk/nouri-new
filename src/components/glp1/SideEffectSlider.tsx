import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SideEffectSliderProps {
  label: string;
  icon: string;
  value: number;
  onChange: (v: number) => void;
}

export function SideEffectSlider({ label, icon, value, onChange }: SideEffectSliderProps) {
  const color = value <= 3 ? '#1A6B3C' : value <= 6 ? '#F59E0B' : '#EF4444';
  return (
    <View className="mb-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-text-muted text-sm">{icon} {label}</Text>
        <Text className="font-bold text-sm" style={{ color }}>{value}/10</Text>
      </View>
      <View className="flex-row gap-1">
        {Array.from({ length: 11 }, (_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => onChange(i)}
            className="flex-1 h-6 rounded"
            style={{ backgroundColor: i <= value ? color : '#E5E7EB' }}
          />
        ))}
      </View>
    </View>
  );
}
