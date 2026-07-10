import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MacroRing } from '../../src/components/home/MacroRing';
import { MealSection } from '../../src/components/home/MealSection';
import { WaterTracker } from '../../src/components/home/WaterTracker';
import { GutScoreBanner } from '../../src/components/home/GutScoreBanner';
import { Card } from '../../src/components/shared/Card';
import { useDiaryStore } from '../../src/stores/diaryStore';
import { useProfileStore } from '../../src/stores/profileStore';
import { DiaryEntry } from '../../src/types';

const MEAL_TYPES: DiaryEntry['meal_type'][] = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function HomeScreen() {
  const { summary } = useDiaryStore();
  const { profile } = useProfileStore();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const entriesByMeal = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = summary.entries.filter(e => e.meal_type === type);
    return acc;
  }, {} as Record<DiaryEntry['meal_type'], DiaryEntry[]>);

  const remaining = profile.calorie_target - summary.calories;

  return (
    <SafeAreaView className="flex-1 bg-brand-cream" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-5 pt-4">
          <Text className="text-text-muted text-sm">{today}</Text>
          <Text className="text-2xl font-bold text-text-primary mt-1">
            Hey {profile.name} 👋
          </Text>

          <Card className="mt-4 items-center py-6">
            <MacroRing
              calories={summary.calories}
              calorieTarget={profile.calorie_target}
              protein={summary.protein}
              proteinTarget={profile.protein_target}
              carbs={summary.carbs}
              carbsTarget={profile.carbs_target}
              fat={summary.fat}
              fatTarget={profile.fat_target}
            />
            <View className="flex-row gap-4 mt-4 w-full px-2">
              <View className="flex-1 bg-brand-light rounded-xl p-3 items-center">
                <Text className="text-brand-green text-lg font-bold">{remaining > 0 ? remaining : 0}</Text>
                <Text className="text-text-muted text-xs">Remaining</Text>
              </View>
              <View className="flex-1 bg-blue-50 rounded-xl p-3 items-center">
                <Text className="text-blue-600 text-lg font-bold">0</Text>
                <Text className="text-text-muted text-xs">Exercise</Text>
              </View>
            </View>
          </Card>

          {profile.gut_health_enabled && (
            <GutScoreBanner score={summary.gut_score} />
          )}

          <WaterTracker />

          <Text className="text-lg font-bold text-text-primary mt-5 mb-1">Today's Food</Text>
          {MEAL_TYPES.map(type => (
            <MealSection key={type} type={type} entries={entriesByMeal[type]} />
          ))}

          {summary.entries.length === 0 && (
            <Card className="mt-3 items-center py-8">
              <Text style={{ fontSize: 36 }}>🍽️</Text>
              <Text className="text-text-muted mt-2 text-center">No food logged yet today.{'\n'}Tap + to log your first meal.</Text>
            </Card>
          )}

          <Card className="mt-3">
            <Text className="font-semibold text-text-primary mb-1">💡 Today's Insight</Text>
            <Text className="text-text-muted text-sm">
              You're hitting your protein target well. Add some leafy greens at dinner to boost your gut diversity score.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
