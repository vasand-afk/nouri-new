import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodResultCard } from '../../src/components/diary/FoodResultCard';
import { Chip } from '../../src/components/shared/Chip';
import { useDiaryStore } from '../../src/stores/diaryStore';
import { Food, DiaryEntry } from '../../src/types';
import { mockEntries } from '../../src/mocks/diary';

type LogMode = 'search' | 'barcode' | 'camera' | 'voice';
type MealType = DiaryEntry['meal_type'];

const MOCK_SEARCH_RESULTS: Food[] = mockEntries.map(e => e.food);

const MEAL_OPTIONS: { key: MealType; label: string }[] = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'snack', label: 'Snack' },
];

export default function LogMealScreen() {
  const { addEntry } = useDiaryStore();
  const [mode, setMode] = useState<LogMode>('search');
  const [query, setQuery] = useState('');
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [added, setAdded] = useState<string[]>([]);

  const results = query.length > 0
    ? MOCK_SEARCH_RESULTS.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : MOCK_SEARCH_RESULTS;

  function handleAdd(food: Food) {
    const entry: DiaryEntry = {
      id: Date.now().toString(),
      food,
      meal_type: mealType,
      quantity_g: food.serving_size_g,
      logged_at: new Date().toISOString(),
    };
    addEntry(entry);
    setAdded(prev => [...prev, food.id]);
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-cream" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
        <Text className="text-xl font-bold text-text-primary">Log Meal</Text>
        <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
          <Text className="text-text-muted text-lg">✕</Text>
        </TouchableOpacity>
      </View>

      <View className="px-5 pt-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {MEAL_OPTIONS.map(m => (
            <Chip key={m.key} label={m.label} selected={mealType === m.key} onPress={() => setMealType(m.key)} />
          ))}
        </ScrollView>

        <View className="flex-row gap-2 mb-4">
          {(['search', 'barcode', 'camera', 'voice'] as LogMode[]).map(m => (
            <TouchableOpacity
              key={m}
              onPress={() => setMode(m)}
              className={`flex-1 py-3 rounded-xl items-center ${mode === m ? 'bg-brand-green' : 'bg-white border border-gray-100'}`}
            >
              <Text style={{ fontSize: 18 }}>
                {m === 'search' ? '🔍' : m === 'barcode' ? '📷' : m === 'camera' ? '🤖' : '🎙️'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {mode === 'search' && (
          <TextInput
            placeholder="Search foods..."
            value={query}
            onChangeText={setQuery}
            className="bg-white rounded-2xl px-4 py-4 mb-4 text-base text-text-primary border border-gray-100"
            placeholderTextColor="#9CA3AF"
            autoFocus
          />
        )}

        {mode !== 'search' && (
          <View className="bg-white rounded-2xl p-8 mb-4 items-center">
            <Text style={{ fontSize: 40 }}>{mode === 'barcode' ? '📷' : mode === 'camera' ? '🤖' : '🎙️'}</Text>
            <Text className="text-text-muted mt-2 text-center text-sm">
              {mode === 'barcode' ? 'Tap to scan a barcode' : mode === 'camera' ? 'Take a photo of your meal' : 'Describe what you ate'}
            </Text>
            <Text className="text-text-muted text-xs mt-2">(Coming soon — showing mock results)</Text>
          </View>
        )}
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {results.map(food => (
          <View key={food.id} style={{ opacity: added.includes(food.id) ? 0.5 : 1 }}>
            <FoodResultCard food={food} onAdd={handleAdd} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
