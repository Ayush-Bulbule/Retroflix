import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import AddMovieScreen from '../screens/admin/AddMovieScreen';
import EditMovieScreen from '../screens/admin/EditMovieScreen';

const Stack = createStackNavigator();

const AdminNavigator = () => {
    return (
        <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AddMovie" component={AddMovieScreen} />
            <Stack.Screen name="EditMovie" component={EditMovieScreen} />
        </Stack.Navigator>
    )
}

export default AdminNavigator

// const styles = StyleSheet.create({})
