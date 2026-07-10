import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`rounded-full px-4 py-2 mr-2 ${selected ? 'bg-brand-green' : 'bg-brand-light border border-brand-green/20'}`}
    >
      <Text className={`text-sm font-medium ${selected ? 'text-white' : 'text-brand-green'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
