import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  fullWidth = false,
}: ButtonProps) {
  const base = `rounded-2xl py-4 px-6 items-center justify-center flex-row ${fullWidth ? 'w-full' : ''}`;
  const variants = {
    primary: 'bg-brand-green',
    secondary: 'bg-brand-light border border-brand-green',
    ghost: 'bg-transparent',
  };
  const textVariants = {
    primary: 'text-white font-semibold text-base',
    secondary: 'text-brand-green font-semibold text-base',
    ghost: 'text-brand-green font-semibold text-base',
  };

  return (
    <TouchableOpacity
      className={`${base} ${variants[variant]} ${disabled || loading ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#1A6B3C'} size="small" />
      ) : (
        <Text className={textVariants[variant]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
