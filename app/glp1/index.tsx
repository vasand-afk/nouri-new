import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '../../src/components/shared/Card';
import { Button } from '../../src/components/shared/Button';
import { SideEffectSlider } from '../../src/components/glp1/SideEffectSlider';

const MEDICATIONS = ['Ozempic', 'Wegovy', 'Mounjaro', 'Zepbound', 'Rybelsus', 'Other'];
const DOSES = ['0.25mg', '0.5mg', '1mg', '2mg', '2.5mg', '5mg', '10mg', '15mg'];

export default function GLP1Screen() {
  const [medication, setMedication] = useState('Ozempic');
  const [dose, setDose] = useState('0.5mg');
  const [nausea, setNausea] = useState(2);
  const [fatigue, setFatigue] = useState(1);
  const [appetite, setAppetite] = useState(4);
  const [energy, setEnergy] = useState(7);
  const [mood, setMood] = useState(7);
  const [saved, setSaved] = useState(false);

  const proteinGoal = 120;

  return (
    <SafeAreaView className="flex-1 bg-brand-cream" edges={['top']}>
      <View className="flex-row items-center px-5 py-4 gap-3">
        <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
          <Text className="text-text-muted">‹</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-primary">GLP-1 Tracker</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        <Card className="mb-3">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="w-10 h-10 rounded-2xl bg-purple-100 items-center justify-center">
              <Text style={{ fontSize: 20 }}>💊</Text>
            </View>
            <View>
              <Text className="font-semibold text-text-primary">Log Injection</Text>
              <Text className="text-text-muted text-xs">Today</Text>
            </View>
          </View>

          <Text className="text-text-muted text-xs font-medium mb-2">MEDICATION</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {MEDICATIONS.map(m => (
              <TouchableOpacity
                key={m}
                onPress={() => setMedication(m)}
                className={`px-4 py-2 rounded-full mr-2 ${medication === m ? 'bg-brand-green' : 'bg-brand-light'}`}
              >
                <Text className={`text-sm font-medium ${medication === m ? 'text-white' : 'text-brand-green'}`}>{m}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="text-text-muted text-xs font-medium mb-2">DOSE</Text>
          <View className="flex-row flex-wrap gap-2">
            {DOSES.map(d => (
              <TouchableOpacity
                key={d}
                onPress={() => setDose(d)}
                className={`px-3 py-2 rounded-xl border ${dose === d ? 'border-brand-green bg-brand-light' : 'border-gray-100 bg-white'}`}
              >
                <Text className={`text-sm font-medium ${dose === d ? 'text-brand-green' : 'text-text-muted'}`}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card className="mb-3">
          <Text className="font-semibold text-text-primary mb-1">🌡️ How are you feeling?</Text>
          <Text className="text-text-muted text-xs mb-4">Rate each symptom 0 (none) → 10 (severe)</Text>
          <SideEffectSlider label="Nausea" icon="🤢" value={nausea} onChange={setNausea} />
          <SideEffectSlider label="Fatigue" icon="😴" value={fatigue} onChange={setFatigue} />
          <SideEffectSlider label="Appetite suppression" icon="🍽️" value={appetite} onChange={setAppetite} />
          <SideEffectSlider label="Energy" icon="⚡" value={energy} onChange={setEnergy} />
          <SideEffectSlider label="Mood" icon="😊" value={mood} onChange={setMood} />
        </Card>

        <Card className="mb-3" style={{ backgroundColor: '#FFF7ED', borderWidth: 1, borderColor: '#FED7AA' }}>
          <View className="flex-row items-center gap-2 mb-1">
            <Text style={{ fontSize: 18 }}>💪</Text>
            <Text className="font-semibold text-orange-800">Protein Goal Reminder</Text>
          </View>
          <Text className="text-orange-700 text-sm">
            You're on GLP-1 medication. Aim for <Text className="font-bold">{proteinGoal}g protein/day</Text> to preserve muscle mass while losing weight.
          </Text>
        </Card>

        <Card className="mb-3" style={{ backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0' }}>
          <View className="flex-row items-center gap-2 mb-1">
            <Text style={{ fontSize: 18 }}>🦠</Text>
            <Text className="font-semibold text-green-800">Gut Motility Note</Text>
          </View>
          <Text className="text-green-700 text-sm">
            GLP-1 medications slow gastric emptying — this can affect your gut microbiome. Prioritise prebiotic fibre, fermented foods, and hydration to maintain gut health.
          </Text>
        </Card>

        <Button
          label={saved ? '✓ Logged' : 'Save Log Entry'}
          onPress={() => setSaved(true)}
          variant={saved ? 'secondary' : 'primary'}
          fullWidth
          disabled={saved}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
