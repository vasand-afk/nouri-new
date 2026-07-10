import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '../shared/Card';
import { useDiaryStore } from '../../stores/diaryStore';

const GLASS_ML = 250;
const glasses = Array.from({ length: 8 }, (_, i) => (i + 1) * GLASS_ML);

export function WaterTracker() {
  const { summary, setWater } = useDiaryStore();
  const water = summary.water_ml;
  const target = 2500;
  const filled = Math.round(water / GLASS_ML);

  return (
    <Card className="mt-3">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-semibold text-text-primary">💧 Water</Text>
        <Text className="text-text-muted text-sm">{(water / 1000).toFixed(1)}L of {(target / 1000).toFixed(1)}L</Text>
      </View>
      <View className="flex-row gap-2">
        {glasses.map((ml, i) => (
          <TouchableOpacity
            key={ml}
            onPress={() => setWater(ml)}
            className={`flex-1 h-8 rounded-lg ${i < filled ? 'bg-blue-400' : 'bg-blue-100'}`}
          />
        ))}
      </View>
    </Card>
  );
}
