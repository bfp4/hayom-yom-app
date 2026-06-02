# Hayom Yom App

A cross-platform React Native app for reading the daily **Hayom Yom** in English and Hebrew.

Built with **Expo SDK 54**, **React Native**, and **Redux**, the app provides a simple mobile-first reading experience with Hebrew date conversion powered by the Hebcal API.

## Overview

Hayom Yom App helps users access the daily Hayom Yom entry from their phone. The app opens to today's reading, displays the Gregorian and Hebrew dates, and lets users move backward or forward by day.

The project is designed as a lightweight production mobile app: data is bundled locally, date conversion happens through a focused API request, and the UI is organized into reusable React Native components.

## Features

- Daily Hayom Yom readings in English and Hebrew
- Forward/backward date navigation
- Tap-to-return-to-today interaction
- Hebrew date conversion using the Hebcal API
- Network retry handling for date lookups
- Custom font loading with Expo Font
- Loading states for app startup and date changes
- Shared state management with Redux

## Tech Stack

- **React Native** for cross-platform mobile UI
- **Expo SDK 54** for development, builds, assets, and native tooling
- **Redux + React Redux** for app state
- **Axios** for API requests
- **Hebcal API** for Gregorian-to-Hebrew date conversion
- **Styled Components** for component-level styling

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

## Project Structure

```text
App.js
components/
  body/            Daily reading display
  card/            Date card UI
  header/          App title/header
  loading-icon/    Loading animation
  main/            Main screen composition
  navigation/      Date navigation and Hebrew date lookup
redux/
  actions.js       Redux action creators
  reducers.js      Date, loading, and reading state
  store.js         Redux store setup
assets/            App constants, icons, and fonts
hayomYomsFull.json Local reading dataset
```
