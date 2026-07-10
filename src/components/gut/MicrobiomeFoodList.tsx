import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../shared/Card';
import { DiaryEntry } from '../../types';

interface MicrobiomeFoodListProps {
  entries: DiaryEntry[];
}

function getGutTag(entry: DiaryEntry): { label: string; color: string; bg: string } | null {
  const f = entry.food;
  if (f.is_probiotic) return { label: 'probiotic', color: '#1A6B3C', bg: '#E8F5EE' };
  if (f.is_prebiotic) return { label: 'prebiotic', color: '#16A34A', bg: '#DCFCE7' };
  if (f.is_fermented) return { label: 'fermented', color: '#7C3AED', bg: '#EDE9FE' };
  if (f.nova_group === 4) return { label: 'ultra-processed', color: '#DC2626', bg: '#FEE2E2' };
  if (f.nova_group === 1) return { label: 'whole food', color: '#2563EB', bg: '#DBEAFE' };
  return null;
}

export function MicrobiomeFoodList({ entries }: MicrobiomeFoodListProps) {
  const tagged = entries.filter(e => getGutTag(e) !== null);

  if (tagged.length === 0) return null;

  return (
    <Card className="mt-3">
      <Text className="font-semibold text-text-primary mb-3">🔬 Gut Impact</Text>
      {entries.map(entry => {
        const tag = getGutTag(entry);
        return (
          <View key={entry.id} className="flex-row items-center justify-between py-2 border-t border-gray-50">
            <Text className="text-text-primary text-sm flex-1" numberOfLines={1}>{entry.food.name}</Text>
            {tag ? (
              <View className="rounded-full px-2 py-0.5 ml-2" style={{ backgroundColor: tag.bg }}>
                <Text className="text-xs font-medium" style={{ color: tag.color }}>{tag.label}</Text>
              </View>
            ) : (
              <View className="rounded-full px-2 py-0.5 ml-2 bg-gray-100">
                <Text className="text-xs text-text-muted">neutral</Text>
              </View>
            )}
          </View>
        );
      })}
    </Card>
  );
}
