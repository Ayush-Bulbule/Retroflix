import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Image, Text, View } from 'react-native'
import CategoryList from '../components/CategoryList';
import Screen from '../components/Screen'
import colors from '../config/colors';


const HomeScreen = () => {

    const [error, setError] = useState(false)
    const categories = ['comedy', 'drama', 'romantic', 'thriller']


    return (
        <Screen style={styles.container}>
            <Image style={styles.image} source={require("../assets/appname.png")} />
            <FlatList
                data={categories}
                keyExtractor={item => categories.indexOf(item).toString()}
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
    ,
    image: {
        width: '100%',
        height: 40,
        resizeMode: 'contain'
    }
})
