import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../shared/Card';
import { GutScore } from '../../types';

interface GutInsightCardProps {
  gutScore: GutScore;
  insight: string;
}

const scoreBreakdown = [
  { key: 'fiber_score' as keyof GutScore, label: 'Fiber', max: 25, icon: '🌾' },
  { key: 'diversity_score' as keyof GutScore, label: 'Diversity', max: 25, icon: '🌈' },
  { key: 'fermented_score' as keyof GutScore, label: 'Fermented', max: 20, icon: '🧫' },
  { key: 'hydration_score' as keyof GutScore, label: 'Hydration', max: 15, icon: '💧' },
  { key: 'prebiotic_score' as keyof GutScore, label: 'Prebiotics', max: 15, icon: '🌿' },
];

export function GutInsightCard({ gutScore, insight }: GutInsightCardProps) {
  return (
    <>
      <Card className="mt-3">
        <Text className="font-semibold text-text-primary mb-3">📊 Score Breakdown</Text>
        {scoreBreakdown.map(({ key, label, max, icon }) => {
          const value = gutScore[key] as number;
          const pct = value / max;
          return (
            <View key={key} className="mb-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-sm text-text-muted">{icon} {label}</Text>
                <Text className="text-sm font-semibold text-text-primary">{value}/{max}</Text>
              </View>
              <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${pct * 100}%`,
                    backgroundColor: pct >= 0.7 ? '#1A6B3C' : pct >= 0.4 ? '#F59E0B' : '#EF4444',
                  }}
                />
              </View>
            </View>
          );
        })}
        {gutScore.processed_penalty > 0 && (
          <View className="flex-row justify-between mt-1 pt-2 border-t border-gray-50">
            <Text className="text-sm text-red-500">⚠️ Ultra-processed penalty</Text>
            <Text className="text-sm font-semibold text-red-500">−{gutScore.processed_penalty}</Text>
          </View>
        )}
      </Card>

      <Card className="mt-3">
        <Text className="font-semibold text-text-primary mb-1">💡 Gut Insight</Text>
        <Text className="text-text-muted text-sm">{insight}</Text>
      </Card>
    </>
  );
}
