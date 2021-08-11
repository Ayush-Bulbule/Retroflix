import React, { useState } from "react";
import { StyleSheet, Image, View, Alert } from "react-native";
import * as Yup from "yup";
import authApi from '../api/auth'

// import authApi from "../api/auth";

import Screen from "../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import routes from "../navigation/routes";
// import useAuth from "../auth/useAuth";


const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});

const RegisterScreen = ({ navigation }) => {


    // const loginApi = useApi(authApi.login);
    const [error, setError] = useState();

    const handleSubmit = async ({ email, password, name }) => {
        const result = await authApi.register(name, email, password)
        console.log(result)

        if (!result.ok) {
            Alert.alert("Registration Failed!")
            console.log("Registration Failed")
            setLoginFailed(true)
            navigation.navigate(routes.LOGIN);
        }
        Alert.alert("Registration Successfull!")
        console.log(result.ok)
        setLoginFailed(false)
    }

    return (
        <Screen style={styles.container}>
            <Image style={styles.image} source={require("../assets/appicon.png")} />
            <View style={styles.form}>
                <Form
                    initialValues={{ email: "", password: "", name: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error="Invalid email or Password." visible={error} />
                    <FormField
                        autoCorrect={false}
                        icon="account"
                        name="name"
                        placeholder="Name"
                        iconColor="#ecf0f1"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder="Email"
                        textContentType="emailAddress"
                        iconColor="#ecf0f1"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password"
                        placeholder="Password"
                        secureTextEntry
                        textContentType="password"
                        iconColor="#ecf0f1"
                    />
                    <SubmitButton title="Register" />
                </Form>
            </View>
        </Screen>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark
    },
    image: {
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginTop: 20,
        marginBottom: 20
    },
    form: {
        marginHorizontal: 15,
        marginTop: 40
    }

});

export default RegisterScreen

