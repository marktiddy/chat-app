# chat-app

 A React Native chat application for iOS and Android which uses cloud storage.

## Development Environment

This app has been developed using Expo. You will also need Android Studio with a device emulator set up and xCode with an iPhone simulator set up.

### Database

The app uses Google's Firebase Firestore database. You will need to configure your own setup for this in Chat.js (found in the components folder). It is advised to store your key separately.

### Required Libraries
This app requies a number of packages. These are:

* [expo] - A toolchain built around React Native
* [expo-image-picker] - Image picker for Expo
* [expo-location] - For getting user location
* [react-navigation-stack] - Used to create in-app navigation
* [react-native-keyboard-spacer] - Used to help sort out keyboard spacing issues on Android devices
* [expo-permissions] - Required to get user permissions to use location, camera and images
* [GiftedChat] - A library to help create a chat application interface
* [react-native-maps] - Used for sharing location maps

## Getting Started
To get started download the project and run npm install to download the required libraries

run expo start to run the project
