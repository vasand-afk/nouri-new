import React from 'react';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

function TabBarIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
    </View>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const tabs = [
    { name: 'index', emoji: '🏠', label: 'Home' },
    { name: 'gut', emoji: '🌿', label: 'Gut' },
    null, // center FAB placeholder
    { name: 'coach', emoji: '✨', label: 'Coach' },
    { name: 'profile', emoji: '👤', label: 'Profile' },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {tabs.map((tab, i) => {
        if (!tab) {
          return (
            <TouchableOpacity
              key="fab"
              onPress={() => router.push('/diary/log')}
              style={styles.fab}
              activeOpacity={0.85}
            >
              <Text style={{ color: '#fff', fontSize: 28, lineHeight: 32 }}>+</Text>
            </TouchableOpacity>
          );
        }

        const routeIndex = i > 2 ? i - 1 : i;
        const route = state.routes[routeIndex];
        const focused = state.index === routeIndex;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}
          >
            <TabBarIcon emoji={tab.emoji} focused={focused} />
            <Text style={[styles.label, { color: focused ? '#1A6B3C' : '#9CA3AF' }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    alignItems: 'center',
    paddingTop: 8,
    height: 72,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A6B3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    shadowColor: '#1A6B3C',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="gut" />
      <Tabs.Screen name="coach" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
