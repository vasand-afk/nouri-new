import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '../shared/Card';
import { DiaryEntry } from '../../types';

interface MealSectionProps {
  type: DiaryEntry['meal_type'];
  entries: DiaryEntry[];
}

const mealMeta: Record<DiaryEntry['meal_type'], { label: string; icon: string; color: string }> = {
  breakfast: { label: 'Breakfast', icon: '☀️', color: '#FEF3C7' },
  lunch: { label: 'Lunch', icon: '🌤️', color: '#DBEAFE' },
  dinner: { label: 'Dinner', icon: '🌙', color: '#EDE9FE' },
  snack: { label: 'Snacks', icon: '🍎', color: '#FCE7F3' },
};

export function MealSection({ type, entries }: MealSectionProps) {
  const meta = mealMeta[type];
  const totalCals = entries.reduce((acc, e) => acc + (e.food.calories_per_100g * e.quantity_g) / 100, 0);

  if (entries.length === 0) return null;

  return (
    <Card className="mt-3">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-xl items-center justify-center" style={{ backgroundColor: meta.color }}>
            <Text>{meta.icon}</Text>
          </View>
          <Text className="font-semibold text-text-primary">{meta.label}</Text>
        </View>
        <Text className="text-text-muted text-sm">{Math.round(totalCals)} kcal</Text>
      </View>

      {entries.map((entry) => (
        <View key={entry.id} className="flex-row items-center justify-between py-2 border-t border-gray-50">
          <View className="flex-1">
            <Text className="text-text-primary text-sm font-medium" numberOfLines={1}>{entry.food.name}</Text>
            {entry.food.brand && <Text className="text-text-muted text-xs">{entry.food.brand}</Text>}
          </View>
          <View className="items-end">
            <Text className="text-text-primary text-sm font-semibold">
              {Math.round((entry.food.calories_per_100g * entry.quantity_g) / 100)} kcal
            </Text>
            <Text className="text-text-muted text-xs">{entry.quantity_g}g</Text>
          </View>
        </View>
      ))}
    </Card>
  );
}
