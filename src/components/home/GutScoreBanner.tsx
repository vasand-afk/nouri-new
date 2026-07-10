import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { getGutScoreColor, getGutScoreLabel } from '../../utils/gutScore';

interface GutScoreBannerProps {
  score: number;
}

export function GutScoreBanner({ score }: GutScoreBannerProps) {
  const color = getGutScoreColor(score);
  const label = getGutScoreLabel(score);

  return (
    <TouchableOpacity
      onPress={() => router.push('/(tabs)/gut')}
      className="rounded-2xl p-4 mt-3 flex-row items-center justify-between"
      style={{ backgroundColor: color + '15', borderWidth: 1, borderColor: color + '30' }}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center gap-3">
        <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: color + '25' }}>
          <Text style={{ fontSize: 22 }}>🌿</Text>
        </View>
        <View>
          <Text className="text-text-muted text-xs font-medium">GUT SCORE TODAY</Text>
          <Text className="text-xl font-bold" style={{ color }}>{score} — {label}</Text>
        </View>
      </View>
      <Text style={{ color, fontSize: 18 }}>›</Text>
    </TouchableOpacity>
  );
}
