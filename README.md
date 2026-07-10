# Nouri — Nutrition & Gut Health iOS App

React Native + Expo 57 frontend, built mobile-first with mock data.

## Setup

```bash
npm install
npx expo start
```

> **Important:** Never run `npm audit fix --force` — it will downgrade Expo and break the project.  
> Audit warnings in this repo are from Expo's internal dependencies and are not exploitable in a mobile app context.

## Run on iOS Simulator

```bash
npx expo run:ios
```

First build takes ~10 minutes (compiles native modules). Subsequent builds are fast.

> **Note:** The project path must not contain spaces. If you cloned into a folder with spaces, move it first.

## Project Structure

```
app/
  (auth)/         — Welcome + onboarding wizard
  (tabs)/         — Home, Gut Health, AI Coach, Profile tabs
  diary/log.tsx   — Log Meal modal
  glp1/index.tsx  — GLP-1 injection tracker
src/
  components/     — Shared UI primitives + feature components
  stores/         — Zustand state (mock data, no backend yet)
  mocks/          — Seed data for profile, diary, gut score
  utils/          — Gut score algorithm
  types/          — TypeScript definitions
```

## Tech Stack

- Expo 57 + expo-router (file-based navigation)
- NativeWind 4 + Tailwind CSS 3 (styling)
- Zustand (state management)
- react-native-svg (charts/rings)
- react-native-reanimated 4
