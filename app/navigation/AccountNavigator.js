import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Account" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default AccountNavigator

// const styles = StyleSheet.create({})
