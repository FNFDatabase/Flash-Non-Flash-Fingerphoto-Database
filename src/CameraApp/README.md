# Camera App

This is a **React Native camera application built with Expo**.  
It supports capturing **paired images with flash and without flash**, saving them to the device gallery, switching between front and back cameras, and using a **grid overlay** for alignment.

## Requirements

Before installing, ensure the following are available:

- **Node.js** (LTS recommended, ≥ 18)
- **npm** (comes with Node.js)
- **Android Studio** (for Android emulator) or **Xcode** (for iOS simulator, macOS only)
- **Expo Go app** (optional, for running on a physical device)

## Installation

1. **Install Node modules**
```bash
npm install
````

This installs all required dependencies listed in `package.json`.

## Running the App (Expo Go – Default)

2. **Start the Expo development server**

```bash
npm start
```

or

```bash
npx expo start
```

3. **Run on a device or emulator**

* Scan the QR code using the **Expo Go** app on your phone, **or**
* Launch on an emulator using the options below.

### Android

```bash
npm run android
```

### iOS 

```bash
npm run ios
```

### Web (optional)

```bash
npm run web
```

> **Note:** This app runs in **Expo Go by default** and does **not require a custom development build** for standard camera functionality.

## Development Build (Optional)

A **custom development build** is required **only if** native code is added or Expo Go limitations are encountered (e.g., advanced camera control).

### Create a Development Build

```bash
npx expo prebuild
```

### Run on Android

```bash
npx expo run:android
```

### Run on iOS

```bash
npx expo run:ios
```

This generates platform-specific native projects and installs the app directly on the emulator or device.

## Permissions

The app requires:

* **Camera access** (to capture images)
* **Media library access** (to save images)

Expo automatically prompts for these permissions at runtime.

## Features

* Open camera in a modal
* Capture two images per session (flash & non-flash)
* Save captured images to the device gallery
* Switch between front and back cameras
* Grid overlay for alignment

## Dependencies

* `expo-camera`
* `expo-media-library`
* `expo-file-system`
* `react-native-paper`

## License

This project is licensed under the **0BSD License**.
