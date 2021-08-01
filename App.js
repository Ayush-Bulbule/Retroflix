import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (

    // <WelcomeScreen />
    <HomeScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
