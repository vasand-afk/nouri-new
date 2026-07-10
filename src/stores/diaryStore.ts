import { create } from 'zustand';
import { DiaryEntry, DailySummary } from '../types';
import { mockDailySummary } from '../mocks/diary';

interface DiaryState {
  summary: DailySummary;
  addEntry: (entry: DiaryEntry) => void;
  removeEntry: (id: string) => void;
  setWater: (ml: number) => void;
}

export const useDiaryStore = create<DiaryState>((set) => ({
  summary: mockDailySummary,

  addEntry: (entry) =>
    set((state) => ({
      summary: {
        ...state.summary,
        entries: [...state.summary.entries, entry],
        calories: state.summary.calories + Math.round((entry.food.calories_per_100g * entry.quantity_g) / 100),
        protein: state.summary.protein + Math.round((entry.food.protein_per_100g * entry.quantity_g) / 100),
        carbs: state.summary.carbs + Math.round((entry.food.carbs_per_100g * entry.quantity_g) / 100),
        fat: state.summary.fat + Math.round((entry.food.fat_per_100g * entry.quantity_g) / 100),
        fiber: Math.round((state.summary.fiber + (entry.food.fiber_per_100g * entry.quantity_g) / 100) * 10) / 10,
      },
    })),

  removeEntry: (id) =>
    set((state) => ({
      summary: {
        ...state.summary,
        entries: state.summary.entries.filter((e) => e.id !== id),
      },
    })),

  setWater: (ml) =>
    set((state) => ({
      summary: { ...state.summary, water_ml: ml },
    })),
}));
