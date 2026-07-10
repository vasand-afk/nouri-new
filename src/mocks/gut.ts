import { GutScore } from '../types';

export const mockGutScore: GutScore = {
  total: 68,
  fiber_score: 18,
  diversity_score: 15,
  fermented_score: 10,
  hydration_score: 11,
  processed_penalty: 0,
  prebiotic_score: 14,
  plant_families: ['Ericaceae', 'Fabaceae'],
  fermented_count: 1,
  prebiotic_count: 2,
  ultra_processed_count: 0,
};

export const mockGutInsight =
  "You've logged 2 diverse plant families today. Add a leafy green (spinach, kale) to hit 3 and boost your diversity score.";

export const mockWeeklyGutScores = [52, 61, 58, 70, 65, 72, 68];
