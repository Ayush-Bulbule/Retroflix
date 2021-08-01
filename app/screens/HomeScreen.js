import React from 'react'
import { FlatList, StyleSheet, Image, Text, View } from 'react-native'
import CategoryList from '../components/CategoryList';
import Screen from '../components/Screen'
import colors from '../config/colors';
import categories from '../data/categories'
const fristcategory = categories.items[0];

const HomeScreen = () => {
    return (
        <Screen style={styles.container}>
            <FlatList
                data={categories.items}
                renderItem={({ item }) => <CategoryList data={item} />} />
        </Screen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
})
