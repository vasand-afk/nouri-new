import React from 'react';
import { View, ScrollView, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function Screen({ children, scrollable = false, style, edges = ['top'] }: ScreenProps) {
  const content = scrollable ? (
    <ScrollView
      className="flex-1 bg-brand-cream"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1 bg-brand-cream" style={style}>
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-brand-cream" edges={edges}>
      {content}
    </SafeAreaView>
  );
}
