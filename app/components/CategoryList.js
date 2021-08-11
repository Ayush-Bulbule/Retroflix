import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, Image, FlatList } from 'react-native'

import colors from '../config/colors'
import routes from '../navigation/routes'
import { useNavigation } from '@react-navigation/core'
import listingsApi from '../api/movieapi'


const CategoryList = ({ data }) => {
    const navigation = useNavigation();

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const categories = ['comedy', 'drama', 'romantic', 'thriller']

    const getMovies = async (category) => {
        const response = await listingsApi.getMovieByCategory(category);

        if (!response.ok) {
            return setError(true)
        }
        setError(false)
        setMovies(response.data)
    }

    useEffect(() => {
        getMovies(data);
    }, [])

    return (
        <>
            <Text style={styles.heading}>{data}</Text>
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.MOVIE_DETAILS, { item })}>
                        <Image style={styles.image} source={{ uri: item.thumbnail }} />
                    </TouchableWithoutFeedback>
                )}
                keyExtractor={(item) => item.id}
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
        textTransform: 'capitalize',
        color: colors.white
    },
    image: {
        width: 120,
        height: 170,
        resizeMode: 'cover',
        borderRadius: 5,
        margin: 5
    }
})


