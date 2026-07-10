import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { getGutScoreColor, getGutScoreLabel } from '../../utils/gutScore';

interface GutScoreRingProps {
  score: number;
}

export function GutScoreRing({ score }: GutScoreRingProps) {
  const SIZE = 180;
  const SW = 16;
  const r = (SIZE - SW) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(1, score / 100));
  const cx = SIZE / 2;
  const color = getGutScoreColor(score);
  const label = getGutScoreLabel(score);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={SIZE} height={SIZE} style={{ position: 'absolute' }}>
          <Circle cx={cx} cy={cx} r={r} stroke="#F3F4F6" strokeWidth={SW} fill="none" />
          <Circle
            cx={cx} cy={cx} r={r}
            stroke={color} strokeWidth={SW} fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            rotation="-90" origin={`${cx},${cx}`}
          />
        </Svg>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 42, fontWeight: '800', color }}>
            {score}
          </Text>
          <Text style={{ fontSize: 12, color: '#6B7280', fontWeight: '600' }}>GUT SCORE</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color, marginTop: 2 }}>{label}</Text>
        </View>
      </View>
    </View>
  );
}
