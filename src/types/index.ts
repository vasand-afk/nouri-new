export interface Profile {
  id: string;
  name: string;
  avatar?: string;
  goal: 'lose_weight' | 'maintain' | 'gain_muscle' | 'gut_health';
  age: number;
  sex: 'male' | 'female' | 'other';
  height_cm: number;
  weight_kg: number;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  is_glp1_user: boolean;
  gut_health_enabled: boolean;
  calorie_target: number;
  protein_target: number;
  carbs_target: number;
  fat_target: number;
  fiber_target: number;
  water_target_ml: number;
  streak_days: number;
  foods_logged_total: number;
  is_premium: boolean;
}

export interface Food {
  id: string;
  name: string;
  brand?: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  fiber_per_100g: number;
  serving_size_g: number;
  serving_label: string;
  nova_group?: 1 | 2 | 3 | 4;
  is_fermented?: boolean;
  is_prebiotic?: boolean;
  is_probiotic?: boolean;
  plant_family?: string;
}

export interface DiaryEntry {
  id: string;
  food: Food;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  quantity_g: number;
  logged_at: string;
}

export interface DailySummary {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water_ml: number;
  gut_score: number;
  entries: DiaryEntry[];
}

export interface GutScore {
  total: number;
  fiber_score: number;
  diversity_score: number;
  fermented_score: number;
  hydration_score: number;
  processed_penalty: number;
  prebiotic_score: number;
  plant_families: string[];
  fermented_count: number;
  prebiotic_count: number;
  ultra_processed_count: number;
}

export interface InjectionLog {
  id: string;
  date: string;
  medication: string;
  dose_mg: number;
  site: string;
  nausea: number;
  fatigue: number;
  appetite: number;
  energy: number;
  mood: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
