import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../shared/Card';

interface FiberTrackerProps {
  fiber: number;
  target: number;
}

export function FiberTracker({ fiber, target }: FiberTrackerProps) {
  const pct = Math.min(1, fiber / target);
  const color = pct >= 0.8 ? '#1A6B3C' : pct >= 0.5 ? '#F59E0B' : '#EF4444';

  return (
    <Card className="mt-3">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-2">
          <Text style={{ fontSize: 18 }}>🌾</Text>
          <Text className="font-semibold text-text-primary">Fiber</Text>
        </View>
        <Text className="font-bold" style={{ color }}>
          {fiber.toFixed(1)}g <Text className="text-text-muted font-normal text-sm">/ {target}g</Text>
        </Text>
      </View>
      <View className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <View className="h-full rounded-full" style={{ width: `${pct * 100}%`, backgroundColor: color }} />
      </View>
      {pct < 0.5 && (
        <Text className="text-text-muted text-xs mt-2">
          Add legumes, oats, or vegetables to hit your fiber goal.
        </Text>
      )}
    </Card>
  );
}
