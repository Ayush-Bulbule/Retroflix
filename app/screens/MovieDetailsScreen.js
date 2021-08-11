import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Image, ScrollView, StyleSheet, View, Dimensions, TouchableOpacity, Share } from 'react-native'
import Screen from '../components/Screen'
import Text from '../components/Text'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AppButton from '../components/Button';
import colors from '../config/colors';
import YoutubePlayer from 'react-native-youtube-iframe'

import routes from '../navigation/routes';
import movieapi from '../api/movieapi';

const MovieDetailsScreen = ({ navigation, route }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [liked, setLiked] = useState(false)
    const [movie, setMovie] = useState("")

    const { item } = route.params;
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);


    const onShare = async (video) => {
        try {
            const result = await Share.share({
                message:
                    `Watch this movie! https://youtu.be/${video}`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const likeMovie = async (id) => {
        if (!liked) {
            const response = await movieapi.likeMovie(id)
            if (!response.ok) {
                return setLiked(false)
            } else {
                const movie = await movieapi.getMovieById(id);
                setMovie(movie.data)
            }
            setLiked(true)
            console.log(response.data)
            console.log("Liked")
        }
    }

    useEffect(() => {
        const { item } = route.params;
        setMovie(item)
    }, [])

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <YoutubePlayer
                    width={windowWidth}
                    height={220}
                    videoId={movie.video}
                    play={playing}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>{movie.name}</Text>
                    <View style={styles.rating}>
                        <Text>{movie.rating}</Text>
                    </View>
                    <View style={styles.optionsWrapper}>
                        <TouchableOpacity style={styles.option} onPress={() => likeMovie(movie.id)}>
                            <MaterialIcons name="thumb-up" size={34} color="white" />
                            <Text style={styles.optionsText}>{movie.likes}</Text>
                        </TouchableOpacity>
                        <View style={styles.option}>
                            <MaterialCommunityIcons name="high-definition-box" size={34} color="white" />
                            <Text style={styles.optionsText}>True HD</Text>
                        </View>
                        <TouchableOpacity style={styles.option} onPress={() => onShare(movie.video)}>
                            <Ionicons name="share-social" size={30} color="white" />
                            <Text style={styles.optionsText}>Share</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.btnWrapper}
                        onPress={togglePlaying}
                    >
                        <Ionicons name={playing ? "pause" : "play"} size={20} color="black" />
                        <Text style={styles.btnText}>{playing ? "Pause" : "Play"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.description}>{movie.description}</Text>
                </View>
            </ScrollView>
        </Screen >
    )
}

export default MovieDetailsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        color: colors.white
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    textWrapper: {
        marginVertical: 15,
        marginHorizontal: 12
    },
    optionsWrapper: {
        flexDirection: 'row',
        marginVertical: 10
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    optionsText: {
        fontSize: 12,
        color: colors.white

    },
    btnWrapper: {
        backgroundColor: colors.white,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    btnText: {
        fontSize: 16,
        color: colors.black
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.white

    },
    rating: {
        color: colors.white
    },
    description: {
        marginTop: 20,

        color: colors.light
    }

})
