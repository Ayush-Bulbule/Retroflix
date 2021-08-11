import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './app/screens/HomeScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import NoNetwork from './app/components/NoNetwork';
import AuthContext from './app/auth/context';

export default function App() {

  const [user, setUser] = useState(null)

  const [loaded] = useFonts({
    NotoSans: require('./app/assets/fonts/NotoSans-Regular.ttf'),
  });

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if (value !== null) {
        const data = JSON.parse(value)
        setUser(data)
      }
    } catch (e) {
      // error reading value
    }
  }
  useEffect(() => {
    getUser();
  }, [])


  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        <NoNetwork />
        {user ? <AppNavigator /> : <AuthNavigator />}
        <StatusBar style='light' />
      </NavigationContainer>
    </AuthContext.Provider>
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