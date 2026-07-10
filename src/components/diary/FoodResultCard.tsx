import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Food } from '../../types';

interface FoodResultCardProps {
  food: Food;
  onAdd: (food: Food) => void;
}

const novaColors: Record<number, string> = { 1: '#1A6B3C', 2: '#84CC16', 3: '#F59E0B', 4: '#EF4444' };

export function FoodResultCard({ food, onAdd }: FoodResultCardProps) {
  const cals = Math.round((food.calories_per_100g * food.serving_size_g) / 100);
  const protein = Math.round((food.protein_per_100g * food.serving_size_g) / 100);
  const carbs = Math.round((food.carbs_per_100g * food.serving_size_g) / 100);
  const fat = Math.round((food.fat_per_100g * food.serving_size_g) / 100);
  const novaColor = food.nova_group ? novaColors[food.nova_group] : '#9CA3AF';

  return (
    <TouchableOpacity
      onPress={() => onAdd(food)}
      className="bg-white rounded-2xl p-4 mb-2 flex-row items-center justify-between"
      style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 1 }, elevation: 1 }}
      activeOpacity={0.8}
    >
      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-1">
          <Text className="font-semibold text-text-primary" numberOfLines={1}>{food.name}</Text>
          {food.is_probiotic && <Text className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">probiotic</Text>}
          {food.is_prebiotic && <Text className="text-xs bg-lime-100 text-lime-700 px-2 py-0.5 rounded-full">prebiotic</Text>}
        </View>
        {food.brand && <Text className="text-text-muted text-xs">{food.brand}</Text>}
        <View className="flex-row gap-3 mt-2">
          <Text className="text-xs text-text-muted">{cals} kcal</Text>
          <Text className="text-xs" style={{ color: '#3B82F6' }}>P {protein}g</Text>
          <Text className="text-xs" style={{ color: '#F59E0B' }}>C {carbs}g</Text>
          <Text className="text-xs" style={{ color: '#EF4444' }}>F {fat}g</Text>
        </View>
      </View>
      <View className="items-end gap-2 ml-3">
        <View className="w-2 h-2 rounded-full" style={{ backgroundColor: novaColor }} />
        <Text className="text-brand-green text-xl font-bold">+</Text>
      </View>
    </TouchableOpacity>
  );
}
