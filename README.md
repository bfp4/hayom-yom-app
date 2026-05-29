# Hayom Yom App

Daily Hayom Yom readings for Android and iOS, built with **Expo SDK 54** + React Native (compatible with the App Store / Play Store version of Expo Go).

Play Store (Android): https://play.google.com/store/apps/details?id=com.levertron.hayomyomapp

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (v20+ recommended)
- [npm](https://www.npmjs.com/) v8 or later
- [Expo Go](https://expo.dev/go) on your phone (latest version from App Store / Play Store)
- For Android: Android Studio + emulator, or a physical device with Expo Go
- For iOS: Xcode (macOS only) + simulator, or a physical device with Expo Go

## Setup

```bash
git clone <repo-url>
cd hayom-yom-app
npm install
```

## Running Locally

Use the **local** Expo CLI bundled in the project (do not use the deprecated global `expo-cli`):

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server (scan QR code with Expo Go) |
| `npm run android` | Open on Android emulator / device |
| `npm run ios` | Open on iOS simulator / device (macOS only) |

## Linting

```bash
npm run lint
```

## Project Structure

```
App.js                    # Root component, font loading, Redux Provider
components/
  main/                   # Shell layout
  header/                 # App header
  navigation/             # Date navigation + Hebcal API call
  body/                   # Displays daily reading
  card/                   # Date card
  loading-icon/           # Loading state
  footer/                 # (unused — pending email issue flow)
  issue-modal/            # Issue report UI (submission pending email integration)
redux/
  store.js                # Redux store
  reducers.js             # State + hayomYomsFull.json data
  actions.js              # Action creators
assets/                   # Fonts, constants
hayomYomsFull.json        # Full dataset of daily readings
```

## Key External Dependencies

- **Hebcal API** (`hebcal.com/converter`) — converts Gregorian dates to Hebrew dates at runtime. Required for the date navigation to work.
- **Email issue reporting** — planned; not yet implemented.

## Release Checklist

1. Bump `version` and `android.versionCode` in `app.json`.
2. Run `npm run lint` and fix any errors.
3. Run `npx expo-doctor` to verify dependency alignment.
4. Smoke test on a physical Android device and iOS simulator via Expo Go.
5. Build via [EAS Build](https://docs.expo.dev/build/introduction/).
6. Submit to Play Store / App Store.
