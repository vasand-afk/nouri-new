import { DiaryEntry, GutScore } from '../types';

export function computeGutScore(entries: DiaryEntry[], water_ml: number, fiber_target: number): GutScore {
  const fiberGrams = entries.reduce((acc, e) => acc + (e.food.fiber_per_100g * e.quantity_g) / 100, 0);
  const plantFamilies = [...new Set(entries.map(e => e.food.plant_family).filter(Boolean) as string[])];
  const fermentedCount = entries.filter(e => e.food.is_fermented || e.food.is_probiotic).length;
  const prebioticCount = entries.filter(e => e.food.is_prebiotic).length;
  const ultraProcessedCount = entries.filter(e => e.food.nova_group === 4).length;

  const fiber_score = Math.min(25, Math.round((fiberGrams / fiber_target) * 25));
  const diversity_score = Math.min(25, plantFamilies.length * 5);
  const fermented_score = Math.min(20, fermentedCount * 10);
  const hydration_score = Math.min(15, Math.round((water_ml / 2500) * 15));
  const processed_penalty = Math.min(50, ultraProcessedCount * 10);
  const prebiotic_score = Math.min(15, prebioticCount * 5);

  const total = Math.max(0, fiber_score + diversity_score + fermented_score + hydration_score - processed_penalty + prebiotic_score);

  return {
    total,
    fiber_score,
    diversity_score,
    fermented_score,
    hydration_score,
    processed_penalty,
    prebiotic_score,
    plant_families: plantFamilies,
    fermented_count: fermentedCount,
    prebiotic_count: prebioticCount,
    ultra_processed_count: ultraProcessedCount,
  };
}

export function getGutScoreColor(score: number): string {
  if (score >= 70) return '#1A6B3C';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
}

export function getGutScoreLabel(score: number): string {
  if (score >= 70) return 'Thriving';
  if (score >= 50) return 'Good';
  if (score >= 30) return 'Fair';
  return 'Needs Work';
}
