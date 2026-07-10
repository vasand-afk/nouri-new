import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface MacroRingProps {
  calories: number;
  calorieTarget: number;
  protein: number;
  proteinTarget: number;
  carbs: number;
  carbsTarget: number;
  fat: number;
  fatTarget: number;
}

function Arc({
  cx, cy, r, strokeWidth, progress, color, dash, total,
}: { cx: number; cy: number; r: number; strokeWidth: number; progress: number; color: string; dash: number; total: number }) {
  const circumference = 2 * Math.PI * r;
  const startAngle = -Math.PI / 2 + (dash / total) * 2 * Math.PI;
  const arcLength = ((dash + 1 > total ? total - dash : 1) / total) * circumference * 0.88;
  const offset = circumference - arcLength * Math.min(1, Math.max(0, progress));
  return (
    <Circle
      cx={cx} cy={cy} r={r}
      stroke={color} strokeWidth={strokeWidth} fill="none"
      strokeDasharray={`${arcLength} ${circumference - arcLength}`}
      strokeDashoffset={circumference - arcLength + (arcLength * (1 - Math.min(1, progress)))}
      strokeLinecap="round"
      rotation={`${(dash / total) * 360 - 90}`}
      origin={`${cx},${cy}`}
    />
  );
}

export function MacroRing({ calories, calorieTarget, protein, proteinTarget, carbs, carbsTarget, fat, fatTarget }: MacroRingProps) {
  const SIZE = 200;
  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
      <Svg width={SIZE} height={SIZE} style={{ position: 'absolute' }}>
        {/* Track rings */}
        {[{ r: 80, sw: 14 }, { r: 62, sw: 12 }, { r: 46, sw: 10 }].map((ring) => (
          <Circle key={ring.r} cx={cx} cy={cy} r={ring.r} stroke="#F3F4F6" strokeWidth={ring.sw} fill="none" />
        ))}
        {/* Calorie ring (outermost) */}
        <Circle
          cx={cx} cy={cy} r={80} stroke="#1A6B3C" strokeWidth={14} fill="none"
          strokeDasharray={`${2 * Math.PI * 80}`}
          strokeDashoffset={2 * Math.PI * 80 * (1 - Math.min(1, calories / calorieTarget))}
          strokeLinecap="round" rotation="-90" origin={`${cx},${cy}`}
        />
        {/* Protein ring */}
        <Circle
          cx={cx} cy={cy} r={62} stroke="#3B82F6" strokeWidth={12} fill="none"
          strokeDasharray={`${2 * Math.PI * 62}`}
          strokeDashoffset={2 * Math.PI * 62 * (1 - Math.min(1, protein / proteinTarget))}
          strokeLinecap="round" rotation="-90" origin={`${cx},${cy}`}
        />
        {/* Carbs ring */}
        <Circle
          cx={cx} cy={cy} r={46} stroke="#F59E0B" strokeWidth={10} fill="none"
          strokeDasharray={`${2 * Math.PI * 46}`}
          strokeDashoffset={2 * Math.PI * 46 * (1 - Math.min(1, carbs / carbsTarget))}
          strokeLinecap="round" rotation="-90" origin={`${cx},${cy}`}
        />
      </Svg>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: '800', color: '#1A1A1A' }}>{calories}</Text>
        <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '600' }}>of {calorieTarget} kcal</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
        {[
          { label: 'Protein', value: protein, target: proteinTarget, color: '#3B82F6', unit: 'g' },
          { label: 'Carbs', value: carbs, target: carbsTarget, color: '#F59E0B', unit: 'g' },
          { label: 'Fat', value: fat, target: fatTarget, color: '#EF4444', unit: 'g' },
        ].map((m) => (
          <View key={m.label} style={{ alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: m.color, marginBottom: 2 }} />
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#1A1A1A' }}>{Math.round(m.value)}{m.unit}</Text>
            <Text style={{ fontSize: 10, color: '#9CA3AF' }}>{m.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
