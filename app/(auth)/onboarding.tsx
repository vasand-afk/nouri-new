import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/shared/Screen';
import { Button } from '../../src/components/shared/Button';
import { useProfileStore } from '../../src/stores/profileStore';
import { Profile } from '../../src/types';

const TOTAL_STEPS = 5;

type GoalOption = { key: Profile['goal']; label: string; icon: string; desc: string };
type ActivityOption = { key: Profile['activity_level']; label: string; desc: string };

const goals: GoalOption[] = [
  { key: 'lose_weight', label: 'Lose Weight', icon: '🔥', desc: 'Reduce body fat gradually' },
  { key: 'maintain', label: 'Maintain', icon: '⚖️', desc: 'Stay at my current weight' },
  { key: 'gain_muscle', label: 'Gain Muscle', icon: '💪', desc: 'Build lean muscle mass' },
  { key: 'gut_health', label: 'Gut Health', icon: '🌱', desc: 'Optimise my microbiome' },
];

const activities: ActivityOption[] = [
  { key: 'sedentary', label: 'Sedentary', desc: 'Desk job, little exercise' },
  { key: 'light', label: 'Lightly Active', desc: '1-3 days/week' },
  { key: 'moderate', label: 'Moderately Active', desc: '3-5 days/week' },
  { key: 'active', label: 'Very Active', desc: '6-7 days/week' },
  { key: 'very_active', label: 'Athlete', desc: 'Twice daily training' },
];

export default function OnboardingScreen() {
  const { setProfile, completeOnboarding } = useProfileStore();
  const [step, setStep] = useState(1);

  const [name, setName] = useState('');
  const [goal, setGoal] = useState<Profile['goal']>('lose_weight');
  const [age, setAge] = useState('30');
  const [sex, setSex] = useState<Profile['sex']>('female');
  const [height, setHeight] = useState('168');
  const [weight, setWeight] = useState('70');
  const [activity, setActivity] = useState<Profile['activity_level']>('moderate');
  const [isGlp1, setIsGlp1] = useState(false);
  const [gutEnabled, setGutEnabled] = useState(false);

  const progress = step / TOTAL_STEPS;

  function next() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setProfile({
        name,
        goal,
        age: parseInt(age),
        sex,
        height_cm: parseInt(height),
        weight_kg: parseInt(weight),
        activity_level: activity,
        is_glp1_user: isGlp1,
        gut_health_enabled: gutEnabled,
      });
      completeOnboarding();
      router.replace('/(tabs)' as any);
    }
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  const stepTitles = [
    'What\'s your goal?',
    'About you',
    'Activity level',
    'GLP-1 medication?',
    'Gut health tracking?',
  ];

  return (
    <Screen scrollable>
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row items-center mb-6 gap-3">
          {step > 1 && (
            <TouchableOpacity onPress={back} className="w-10 h-10 rounded-full bg-brand-light items-center justify-center">
              <Text className="text-brand-green text-lg">‹</Text>
            </TouchableOpacity>
          )}
          <View className="flex-1 h-2 bg-brand-light rounded-full overflow-hidden">
            <View className="h-full bg-brand-green rounded-full" style={{ width: `${progress * 100}%` }} />
          </View>
          <Text className="text-text-muted text-sm">{step}/{TOTAL_STEPS}</Text>
        </View>

        <Text className="text-2xl font-bold text-text-primary mb-6">{stepTitles[step - 1]}</Text>

        {step === 1 && (
          <View className="gap-3">
            <TextInput
              placeholder="Your first name"
              value={name}
              onChangeText={setName}
              className="bg-white rounded-2xl px-4 py-4 text-base text-text-primary border border-gray-100"
              placeholderTextColor="#9CA3AF"
            />
            <View className="gap-3 mt-2">
              {goals.map((g) => (
                <TouchableOpacity
                  key={g.key}
                  onPress={() => setGoal(g.key)}
                  className={`flex-row items-center p-4 rounded-2xl border-2 ${goal === g.key ? 'border-brand-green bg-brand-light' : 'border-gray-100 bg-white'}`}
                >
                  <Text style={{ fontSize: 28 }} className="mr-3">{g.icon}</Text>
                  <View>
                    <Text className={`font-semibold ${goal === g.key ? 'text-brand-green' : 'text-text-primary'}`}>{g.label}</Text>
                    <Text className="text-text-muted text-sm">{g.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View className="gap-4">
            <View className="flex-row gap-3">
              {(['female', 'male', 'other'] as Profile['sex'][]).map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setSex(s)}
                  className={`flex-1 py-4 rounded-2xl items-center border-2 ${sex === s ? 'border-brand-green bg-brand-light' : 'border-gray-100 bg-white'}`}
                >
                  <Text className={`font-semibold capitalize ${sex === s ? 'text-brand-green' : 'text-text-muted'}`}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {[
              { label: 'Age', value: age, set: setAge, placeholder: '30', unit: 'yrs' },
              { label: 'Height', value: height, set: setHeight, placeholder: '170', unit: 'cm' },
              { label: 'Weight', value: weight, set: setWeight, placeholder: '70', unit: 'kg' },
            ].map((field) => (
              <View key={field.label} className="bg-white rounded-2xl px-4 py-3 border border-gray-100">
                <Text className="text-text-muted text-xs mb-1">{field.label}</Text>
                <View className="flex-row items-center">
                  <TextInput
                    value={field.value}
                    onChangeText={field.set}
                    keyboardType="numeric"
                    className="flex-1 text-xl font-semibold text-text-primary"
                    placeholder={field.placeholder}
                    placeholderTextColor="#9CA3AF"
                  />
                  <Text className="text-text-muted">{field.unit}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {step === 3 && (
          <View className="gap-3">
            {activities.map((a) => (
              <TouchableOpacity
                key={a.key}
                onPress={() => setActivity(a.key)}
                className={`p-4 rounded-2xl border-2 ${activity === a.key ? 'border-brand-green bg-brand-light' : 'border-gray-100 bg-white'}`}
              >
                <Text className={`font-semibold ${activity === a.key ? 'text-brand-green' : 'text-text-primary'}`}>{a.label}</Text>
                <Text className="text-text-muted text-sm">{a.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 4 && (
          <View className="gap-4">
            <Text className="text-text-muted">Are you currently taking a GLP-1 medication? (Ozempic, Wegovy, Mounjaro, etc.)</Text>
            <View className="flex-row gap-3">
              {[{ v: true, label: 'Yes' }, { v: false, label: 'No' }].map(({ v, label }) => (
                <TouchableOpacity
                  key={label}
                  onPress={() => setIsGlp1(v)}
                  className={`flex-1 py-5 rounded-2xl items-center border-2 ${isGlp1 === v ? 'border-brand-green bg-brand-light' : 'border-gray-100 bg-white'}`}
                >
                  <Text className={`text-lg font-bold ${isGlp1 === v ? 'text-brand-green' : 'text-text-muted'}`}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {isGlp1 && (
              <View className="bg-brand-light rounded-2xl p-4">
                <Text className="text-brand-green text-sm font-medium">
                  💊 We'll add a GLP-1 tracker and protein goal reminders to help you get the most from your medication.
                </Text>
              </View>
            )}
          </View>
        )}

        {step === 5 && (
          <View className="gap-4">
            <Text className="text-text-muted">
              Nouri can track your gut microbiome health score daily — based on fiber, food diversity, and fermented foods.
            </Text>
            <View className="bg-white rounded-2xl p-4 border border-gray-100 gap-3">
              <Text className="font-semibold text-text-primary">What you get:</Text>
              {['Daily Gut Score (0–100)', 'Fiber & diversity tracking', 'Food classification (prebiotic/probiotic)', 'Connect test kit results (Viome, Zoe)'].map((item) => (
                <View key={item} className="flex-row items-center gap-2">
                  <Text className="text-brand-green">✓</Text>
                  <Text className="text-text-muted text-sm">{item}</Text>
                </View>
              ))}
            </View>
            <View className="flex-row gap-3">
              {[{ v: true, label: 'Enable it' }, { v: false, label: 'Maybe later' }].map(({ v, label }) => (
                <TouchableOpacity
                  key={label}
                  onPress={() => setGutEnabled(v)}
                  className={`flex-1 py-5 rounded-2xl items-center border-2 ${gutEnabled === v ? 'border-brand-green bg-brand-light' : 'border-gray-100 bg-white'}`}
                >
                  <Text className={`font-semibold ${gutEnabled === v ? 'text-brand-green' : 'text-text-muted'}`}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <Button
          label={step === TOTAL_STEPS ? "Let's Go 🚀" : 'Continue'}
          onPress={next}
          variant="primary"
          fullWidth
          style={{ marginTop: 32 }}
          disabled={step === 1 && !name.trim()}
        />
      </View>
    </Screen>
  );
}
