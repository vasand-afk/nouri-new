import { create } from 'zustand';
import { Profile } from '../types';
import { mockProfile } from '../mocks/profile';

interface ProfileState {
  profile: Profile;
  isOnboarded: boolean;
  setProfile: (profile: Partial<Profile>) => void;
  completeOnboarding: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: mockProfile,
  isOnboarded: false,
  setProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),
  completeOnboarding: () => set({ isOnboarded: true }),
}));
