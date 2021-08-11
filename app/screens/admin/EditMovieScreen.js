import React, { useState } from "react";
import { StyleSheet, Image, View, ScrollView, Alert } from "react-native";
import * as Yup from "yup";
import movieApi from '../../api/movieapi'

// import authApi from "../api/auth";

import Screen from "../../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton } from "../../components/forms";
import colors from "../../config/colors";
import Text from '../../components/Text'
import routes from "../../navigation/routes";
// import useAuth from "../auth/useAuth";


const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(1).label("Name"),
    description: Yup.string().required().label("Description"),
    rating: Yup.string().required().label("Rating"),
    thumbnail: Yup.string().required().label("Thumbnail"),
    trailer: Yup.string().required().label("Trailer"),
    video: Yup.string().required().label("Video"),
    category: Yup.string().required().label("Category"),

});


const EditMovieScreen = ({ route, navigation }) => {
    const [error, setError] = useState();

    const { item } = route.params;

    const handleSubmit = async (movie, { resetForm }) => {

        const result = await movieApi.editMovie(movie)
        if (!result.ok) {
            return Alert.alert("Could not edit the listing");
        }
        resetForm();
        Alert.alert("Movie edited Successfully!")
        navigation.navigate(routes.MOVIE_LIST)
    }
    return (
        <Screen style={styles.container}>
            <Text style={styles.title}>Edit Movie</Text>
            <ScrollView style={styles.form}>
                <Form
                    initialValues={{ id: item.id, name: item.name, description: item.description, rating: item.rating, category: item.category, thumbnail: item.thumbnail, trailer: item.trailer, video: item.video, }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error="Invalid email or Password." visible={error} />
                    <FormField
                        autoCorrect={false}
                        name="name"
                        placeholder="Name"
                    />
                    <FormField
                        maxLength={255}
                        multiline
                        name="description"
                        numberOfLines={3}
                        placeholder="Description"
                    />
                    <FormField
                        autoCorrect={false}
                        name="category"
                        placeholder="Category"
                    />
                    <FormField
                        autoCorrect={false}
                        name="rating"
                        placeholder="Rating"
                    />
                    <FormField
                        autoCorrect={false}
                        name="thumbnail"
                        placeholder="Thumbnail"
                    />
                    <FormField
                        autoCorrect={false}
                        name="trailer"
                        placeholder="Trailer"
                    />
                    <FormField
                        autoCorrect={false}
                        name="video"
                        placeholder="VideoCode"
                    />

                    <SubmitButton title="Submit" />
                </Form>
            </ScrollView>
        </Screen>
    )
}

export default EditMovieScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark
    },
    form: {
        marginHorizontal: 15,
        marginTop: 20
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,
        fontWeight: '700'
    }
})
