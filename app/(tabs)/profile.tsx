import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Avatar } from '../../src/components/shared/Avatar';
import { Card } from '../../src/components/shared/Card';
import { useProfileStore } from '../../src/stores/profileStore';
import { useDiaryStore } from '../../src/stores/diaryStore';

const SETTINGS_ROWS = [
  { icon: '🎯', label: 'Goals & Targets', onPress: () => {} },
  { icon: '🔔', label: 'Notifications', onPress: () => {} },
  { icon: '💊', label: 'GLP-1 Tracker', onPress: () => router.push('/glp1/index' as any) },
  { icon: '🔬', label: 'Connected Apps & Test Kits', onPress: () => {} },
  { icon: '⭐', label: 'Upgrade to Premium', onPress: () => {}, highlight: true },
  { icon: '❓', label: 'Help & Support', onPress: () => {} },
];

export default function ProfileScreen() {
  const { profile } = useProfileStore();
  const { summary } = useDiaryStore();

  const goalLabels: Record<typeof profile.goal, string> = {
    lose_weight: 'Lose Weight',
    maintain: 'Maintain Weight',
    gain_muscle: 'Gain Muscle',
    gut_health: 'Gut Health Focus',
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-cream" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-5 pt-4">
          <Text className="text-2xl font-bold text-text-primary">Profile</Text>

          <Card className="mt-4 flex-row items-center gap-4">
            <Avatar name={profile.name} size={56} />
            <View className="flex-1">
              <Text className="text-xl font-bold text-text-primary">{profile.name}</Text>
              <Text className="text-text-muted text-sm">{goalLabels[profile.goal]}</Text>
              {profile.is_glp1_user && (
                <View className="flex-row items-center gap-1 mt-1">
                  <Text style={{ fontSize: 12 }}>💊</Text>
                  <Text className="text-purple-600 text-xs font-medium">GLP-1 user</Text>
                </View>
              )}
            </View>
            {!profile.is_premium && (
              <View className="bg-amber-100 rounded-xl px-3 py-1">
                <Text className="text-amber-700 text-xs font-semibold">Free</Text>
              </View>
            )}
          </Card>

          <View className="flex-row gap-3 mt-3">
            {[
              { label: 'Day Streak', value: profile.streak_days, icon: '🔥' },
              { label: 'Foods Logged', value: profile.foods_logged_total, icon: '📝' },
              { label: 'Avg Gut Score', value: summary.gut_score, icon: '🌿' },
            ].map(stat => (
              <Card key={stat.label} className="flex-1 items-center py-4">
                <Text style={{ fontSize: 22 }}>{stat.icon}</Text>
                <Text className="text-xl font-bold text-text-primary mt-1">{stat.value}</Text>
                <Text className="text-text-muted text-xs text-center">{stat.label}</Text>
              </Card>
            ))}
          </View>

          <Card className="mt-3">
            <Text className="font-semibold text-text-primary mb-3">Body Stats</Text>
            {[
              { label: 'Height', value: `${profile.height_cm} cm` },
              { label: 'Weight', value: `${profile.weight_kg} kg` },
              { label: 'Age', value: `${profile.age} yrs` },
              { label: 'Activity', value: profile.activity_level.replace('_', ' ') },
            ].map(row => (
              <View key={row.label} className="flex-row justify-between py-2 border-t border-gray-50">
                <Text className="text-text-muted text-sm capitalize">{row.label}</Text>
                <Text className="text-text-primary text-sm font-medium capitalize">{row.value}</Text>
              </View>
            ))}
          </Card>

          <Card className="mt-3">
            <Text className="font-semibold text-text-primary mb-3">Daily Targets</Text>
            {[
              { label: '🔥 Calories', value: `${profile.calorie_target} kcal` },
              { label: '🥩 Protein', value: `${profile.protein_target}g` },
              { label: '🌾 Fiber', value: `${profile.fiber_target}g` },
              { label: '💧 Water', value: `${(profile.water_target_ml / 1000).toFixed(1)}L` },
            ].map(row => (
              <View key={row.label} className="flex-row justify-between py-2 border-t border-gray-50">
                <Text className="text-text-muted text-sm">{row.label}</Text>
                <Text className="text-text-primary text-sm font-semibold">{row.value}</Text>
              </View>
            ))}
          </Card>

          <Card className="mt-3">
            {SETTINGS_ROWS.map((row, i) => (
              <TouchableOpacity
                key={row.label}
                onPress={row.onPress}
                className={`flex-row items-center justify-between py-3 ${i > 0 ? 'border-t border-gray-50' : ''}`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-3">
                  <Text style={{ fontSize: 18 }}>{row.icon}</Text>
                  <Text className={`text-sm font-medium ${row.highlight ? 'text-amber-600' : 'text-text-primary'}`}>
                    {row.label}
                  </Text>
                </View>
                <Text className="text-text-muted">›</Text>
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
