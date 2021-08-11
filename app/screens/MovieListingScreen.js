import React, { useState, useEffect, useContext } from 'react'
import { Alert, Image, StyleSheet, View, FlatList, Button, ScrollView, RefreshControl } from 'react-native'
import Card from '../components/Card'
import Screen from '../components/Screen'
import colors from '../config/colors'
import movieApi from '../api/movieapi'
import Text from '../components/Text'
import routes from '../navigation/routes'
import AuthContext from '../auth/context'

const MovieListingScreen = ({ navigation }) => {

    const [listings, setListings] = useState([])
    const [admin, setAdmin] = useState(false)
    const [error, setError] = useState(false)
    const { user } = useContext(AuthContext);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        getMovieListings();
        if (user.id == 6) {
            console.log(user)
            setAdmin(true)
        }

    }, []);

    const getMovieListings = async () => {
        const response = await movieApi.getAllMovies();

        if (!response.ok) {
            return setError(true)

        }
        setError(false)
        setListings(response.data);
        // console.log(response)
        // console.log(response.data)
    }

    const deleteMovie = async (id) => {
        const response = await movieApi.deleteMovieById(id);

        if (!response.ok) {
            return setError(true)
        }
        // setError(false)
        // console.log(response)
        console.log(response.data)
    }

    const onDelete = async (id) => {

        Alert.alert(
            "Sure to Delete?",
            `Do you want to delete movie? Movie Id : ${id}`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => deleteMovie(id),
                }
            ]
        );

    }

    useEffect(() => {
        getMovieListings();
        if (user.id == 6) {
            console.log(user)
            setAdmin(true)
        }
    }, [])

    return (
        <Screen style={styles.container}>
            <Image style={styles.image} source={require("../assets/appname.png")} />

            {error && <>
                <Text>Could't retrive movies.</Text>
                <Button title="Retry" onPress={getMovieListings}></Button>
            </>}

            <FlatList
                data={listings}
                renderItem={({ item }) => <Card
                    item={item}
                    admin={admin}
                    onDelete={() => onDelete(item.id)}
                    onEdit={() => navigation.navigate(routes.EDIT_MOVIE, { item })}
                    onPress={() => navigation.navigate(routes.MOVIE_DETAILS, { item })} />}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </Screen>
    )
}

export default MovieListingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
    image: {
        width: '100%',
        height: 40,
        resizeMode: 'contain',

    }
})
