# Hayom Yom App

A cross-platform React Native app for reading the daily **Hayom Yom** in English and Hebrew.

Built with **Expo SDK 54**, **React Native**, and **Redux**, the app provides a mobile-first reading experience with Hebrew date conversion powered by the Hebcal API, bookmarks, daily reminders, and configurable text layout.

## Download

Get the app on [Google Play](https://play.google.com/store/apps/details?id=com.levertron.hayomyomapp).

## Overview

Hayom Yom App helps users access the daily Hayom Yom entry from their phone. The app opens to today's reading, displays the Gregorian and Hebrew dates, and lets users browse by day, pick a date from a calendar, save favorites, and share entries.

The project is designed as a lightweight production mobile app: readings are bundled locally, date conversion happens through a focused API request with in-memory caching, and the UI is organized into tab-based screens with reusable React Native components.

## Features



### Reading & Navigation

- Daily Hayom Yom readings in English and Hebrew
- Forward/backward date navigation
- Calendar picker with month/year selection and a quick jump to today
- Hebrew date conversion using the Hebcal API
- In-memory Hebrew date caching for faster navigation
- Network retry handling when connectivity returns
- Loading states for app startup and date changes



### Favorites

- Bookmark any entry from the home screen
- Browse saved entries on the Favorites tab, grouped by year
- Tap a favorite to jump back to that day's reading



### Sharing

- Share the current entry via the native share sheet (English and Hebrew text with dates)



### Settings

- **Text layout** — choose how English and Hebrew are displayed:
  - Side by side
  - Hebrew over English
  - English over Hebrew
- **Daily reminder** — schedule a local notification at a chosen time; tapping the notification opens today's reading



### App Experience

- Bottom tab navigation (Hayom Yom, Favorites, Settings)
- Deep linking via `hayomyomapp://` (`/today`, `/favorites`, `/settings`)
- Custom font loading with Expo Font
- Shared state management with Redux
- Persistent preferences and bookmarks with AsyncStorage



## Tech Stack

- **React Native** for cross-platform mobile UI
- **Expo SDK 54** for development, builds, assets, fonts, and notifications
- **React Navigation** (bottom tabs) for screen navigation
- **Redux + React Redux** for app state
- **AsyncStorage** for bookmarks, text layout, and notification preferences
- **Expo Notifications** for daily reminders
- **Axios** for API requests
- **Hebcal API** for Gregorian-to-Hebrew date conversion
- **Styled Components** for component-level styling
- **Font Awesome** for icons



## Getting Started



### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/)
- [Expo Go](https://expo.dev/go) for testing on a physical device
- Android Studio for Android emulator testing
- Xcode for iOS simulator testing on macOS



### Installation

```bash
git clone <repo-url>
cd hayom-yom-app
npm install
```



### Run Locally

Use the local Expo CLI included with the project:

```bash
npm start
```

Then scan the QR code with Expo Go, or launch a platform target directly:

```bash
npm run android
npm run ios
npm run web
```



### Lint

```bash
npm run lint
```



### Production Builds

The app includes a native Android project (`android/`) and is configured for [EAS Build](https://docs.expo.dev/build/introduction/). Use the Expo Application Services CLI to create production builds:

```bash
npx eas-cli build --platform android
npx eas-cli build --platform ios
```



## Project Structure

```text
App.js                 Redux provider and app entry
components/
  body/                Reading display, share/bookmark actions, text layouts
  calendar/            Calendar modal and month/year picker
  card/                Date card UI
  header/              App title/header
  loading-icon/        Loading animation
  main/                Navigation container, notifications, deep linking
  navigation/          Date navigation and Hebrew date lookup
hooks/
  useBookmarks.js      Bookmark state and persistence
  useTextLayout.js     Text layout preference
navigation/
  AppNavigator.js      Bottom tab navigator
  navigationRef.js     Imperative navigation helpers
screens/
  HomeScreen.js        Main reading screen
  FavoritesScreen.js   Saved bookmarks by year
  SettingsScreen.js    Text layout and daily reminder
redux/
  actions.js           Redux action creators
  reducers.js          Date, loading, and reading state
  store.js             Redux store setup
utils/
  bookmarks.js         Bookmark storage helpers
  dateHelpers.js       Date parsing and formatting
  hebrewDateCache.js   In-memory Hebrew date cache
  notifications.js     Daily reminder scheduling
  share.js             Native share formatting
  textLayout.js        Layout option definitions
  storageKeys.js       AsyncStorage key constants
assets/                App constants, icons, and fonts
hayomYomsFull.json     Local reading dataset
android/               Native Android project for production builds
```

