import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, Image, FlatList } from 'react-native'

import colors from '../config/colors'

const CategoryList = ({ data }) => {
    return (
        <>
            <Text style={styles.heading}>{data.title}</Text>
            <FlatList
                data={data.movies}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => console.log("Replace me with navigation")}>
                        <Image style={styles.image} source={{ uri: item.poster }} />
                    </TouchableWithoutFeedback>
                )}
                horizontal
            />
        </>
    )
}

export default CategoryList

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: "600",
        padding: 10,
        color: colors.white
    },
    image: {
        width: 100,
        height: 170,
        resizeMode: 'cover',
        borderRadius: 5,
        margin: 5
    }
})
