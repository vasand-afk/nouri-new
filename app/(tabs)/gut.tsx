import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GutScoreRing } from '../../src/components/gut/GutScoreRing';
import { FiberTracker } from '../../src/components/gut/FiberTracker';
import { MicrobiomeFoodList } from '../../src/components/gut/MicrobiomeFoodList';
import { GutInsightCard } from '../../src/components/gut/GutInsightCard';
import { Card } from '../../src/components/shared/Card';
import { useDiaryStore } from '../../src/stores/diaryStore';
import { useProfileStore } from '../../src/stores/profileStore';
import { computeGutScore } from '../../src/utils/gutScore';
import { mockGutInsight, mockWeeklyGutScores } from '../../src/mocks/gut';

export default function GutScreen() {
  const { summary } = useDiaryStore();
  const { profile } = useProfileStore();

  const gutScore = computeGutScore(summary.entries, summary.water_ml, profile.fiber_target);
  const weekAvg = Math.round(mockWeeklyGutScores.reduce((a, b) => a + b, 0) / mockWeeklyGutScores.length);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <SafeAreaView className="flex-1 bg-brand-cream" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-5 pt-4">
          <Text className="text-2xl font-bold text-text-primary">Gut Health</Text>
          <Text className="text-text-muted text-sm mt-1">Today's microbiome score</Text>

          <Card className="mt-4 items-center py-6">
            <GutScoreRing score={gutScore.total} />
            <View className="flex-row gap-4 mt-5">
              {[
                { label: 'Plant families', value: gutScore.plant_families.length, icon: '🌈' },
                { label: 'Fermented', value: gutScore.fermented_count, icon: '🧫' },
                { label: 'Prebiotic foods', value: gutScore.prebiotic_count, icon: '🌿' },
              ].map(stat => (
                <View key={stat.label} className="flex-1 bg-brand-light rounded-xl p-3 items-center">
                  <Text style={{ fontSize: 18 }}>{stat.icon}</Text>
                  <Text className="text-xl font-bold text-brand-green mt-1">{stat.value}</Text>
                  <Text className="text-text-muted text-xs text-center">{stat.label}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Weekly trend */}
          <Card className="mt-3">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-semibold text-text-primary">📈 This Week</Text>
              <Text className="text-text-muted text-sm">Avg {weekAvg}</Text>
            </View>
            <View className="flex-row items-end gap-1" style={{ height: 60 }}>
              {mockWeeklyGutScores.map((score, i) => (
                <View key={i} className="flex-1 items-center gap-1">
                  <View
                    className="w-full rounded-t-lg"
                    style={{
                      height: (score / 100) * 44,
                      backgroundColor: i === 6 ? '#1A6B3C' : '#E8F5EE',
                    }}
                  />
                  <Text className="text-text-muted" style={{ fontSize: 9 }}>{days[i]}</Text>
                </View>
              ))}
            </View>
          </Card>

          <FiberTracker fiber={summary.fiber} target={profile.fiber_target} />
          <MicrobiomeFoodList entries={summary.entries} />
          <GutInsightCard gutScore={gutScore} insight={mockGutInsight} />

          {/* Connect test kit */}
          <Card className="mt-3 mb-2">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-2xl bg-purple-100 items-center justify-center">
                <Text style={{ fontSize: 22 }}>🔬</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-text-primary">Connect Test Kit</Text>
                <Text className="text-text-muted text-sm">Import Viome, Zoe, or Biomesight results</Text>
              </View>
              <TouchableOpacity className="bg-brand-light rounded-xl px-3 py-2">
                <Text className="text-brand-green text-sm font-semibold">Connect</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
