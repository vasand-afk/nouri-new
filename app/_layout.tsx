import '../src/global.css';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="diary/log" options={{ presentation: 'modal' }} />
        <Stack.Screen name="glp1/index" />
      </Stack>
    </GestureHandlerRootView>
  );
}
