import { DiaryEntry, DailySummary } from '../types';

export const mockEntries: DiaryEntry[] = [
  {
    id: '1',
    food: {
      id: 'f1',
      name: 'Greek Yogurt',
      brand: 'Chobani',
      calories_per_100g: 59,
      protein_per_100g: 10,
      carbs_per_100g: 3.5,
      fat_per_100g: 0.7,
      fiber_per_100g: 0,
      serving_size_g: 170,
      serving_label: '1 container',
      nova_group: 1,
      is_probiotic: true,
      plant_family: undefined,
    },
    meal_type: 'breakfast',
    quantity_g: 170,
    logged_at: new Date().toISOString(),
  },
  {
    id: '2',
    food: {
      id: 'f2',
      name: 'Blueberries',
      calories_per_100g: 57,
      protein_per_100g: 0.7,
      carbs_per_100g: 14,
      fat_per_100g: 0.3,
      fiber_per_100g: 2.4,
      serving_size_g: 100,
      serving_label: '1 cup',
      nova_group: 1,
      is_prebiotic: true,
      plant_family: 'Ericaceae',
    },
    meal_type: 'breakfast',
    quantity_g: 100,
    logged_at: new Date().toISOString(),
  },
  {
    id: '3',
    food: {
      id: 'f3',
      name: 'Grilled Chicken Breast',
      calories_per_100g: 165,
      protein_per_100g: 31,
      carbs_per_100g: 0,
      fat_per_100g: 3.6,
      fiber_per_100g: 0,
      serving_size_g: 150,
      serving_label: '1 breast',
      nova_group: 1,
    },
    meal_type: 'lunch',
    quantity_g: 150,
    logged_at: new Date().toISOString(),
  },
  {
    id: '4',
    food: {
      id: 'f4',
      name: 'Lentil Soup',
      calories_per_100g: 99,
      protein_per_100g: 6.3,
      carbs_per_100g: 17,
      fat_per_100g: 0.4,
      fiber_per_100g: 3.8,
      serving_size_g: 300,
      serving_label: '1 bowl',
      nova_group: 1,
      is_prebiotic: true,
      plant_family: 'Fabaceae',
    },
    meal_type: 'lunch',
    quantity_g: 300,
    logged_at: new Date().toISOString(),
  },
  {
    id: '5',
    food: {
      id: 'f5',
      name: 'Protein Bar',
      brand: 'Quest',
      calories_per_100g: 370,
      protein_per_100g: 33,
      carbs_per_100g: 22,
      fat_per_100g: 14,
      fiber_per_100g: 13,
      serving_size_g: 60,
      serving_label: '1 bar',
      nova_group: 3,
    },
    meal_type: 'snack',
    quantity_g: 60,
    logged_at: new Date().toISOString(),
  },
];

function sumNutrient(entries: DiaryEntry[], key: keyof typeof entries[0]['food']): number {
  return entries.reduce((acc, e) => {
    const per100 = e.food[key] as number;
    return acc + (per100 * e.quantity_g) / 100;
  }, 0);
}

export const mockDailySummary: DailySummary = {
  date: new Date().toISOString().split('T')[0],
  calories: Math.round(sumNutrient(mockEntries, 'calories_per_100g')),
  protein: Math.round(sumNutrient(mockEntries, 'protein_per_100g')),
  carbs: Math.round(sumNutrient(mockEntries, 'carbs_per_100g')),
  fat: Math.round(sumNutrient(mockEntries, 'fat_per_100g')),
  fiber: Math.round(sumNutrient(mockEntries, 'fiber_per_100g') * 10) / 10,
  water_ml: 1800,
  gut_score: 68,
  entries: mockEntries,
};
