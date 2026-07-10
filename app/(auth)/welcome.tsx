import React from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../src/components/shared/Button';

export default function WelcomeScreen() {
  return (
    <LinearGradient colors={['#1A6B3C', '#2D9B5F', '#E8F5EE']} className="flex-1">
      <View className="flex-1 px-6 pt-20 pb-12 justify-between">
        <View className="items-center mt-16">
          <View className="w-24 h-24 rounded-3xl bg-white/20 items-center justify-center mb-6">
            <Text style={{ fontSize: 48 }}>🥬</Text>
          </View>
          <Text className="text-white text-5xl font-bold tracking-tight">Nouri</Text>
          <Text className="text-white/80 text-lg mt-2 text-center">
            Nutrition & gut health,{'\n'}personalized for you
          </Text>
        </View>

        <View className="gap-4">
          <View className="flex-row gap-3 mb-6">
            {[
              { icon: '🔬', text: 'Track gut health' },
              { icon: '🤖', text: 'AI nutrition coach' },
              { icon: '💊', text: 'GLP-1 support' },
            ].map((item) => (
              <View key={item.text} className="flex-1 bg-white/15 rounded-2xl p-3 items-center gap-1">
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                <Text className="text-white text-xs text-center font-medium">{item.text}</Text>
              </View>
            ))}
          </View>

          <Button
            label="Get Started"
            onPress={() => router.push('/(auth)/onboarding')}
            variant="primary"
            fullWidth
            style={{ backgroundColor: '#fff' }}
          />
          <Button
            label="I already have an account"
            onPress={() => router.replace('/(tabs)' as any)}
            variant="ghost"
            fullWidth
          />
        </View>
      </View>
    </LinearGradient>
  );
}
