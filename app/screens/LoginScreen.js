import React, { useState, useContext } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';

import authApi from '../api/auth'

import Screen from "../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import AuthContext from "../auth/context";
// import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});



function LoginScreen(props) {

    const authContext = useContext(AuthContext)

    const [loginFailed, setLoginFailed] = useState(false)
    const handleSubmit = async ({ email, password }) => {
        const result = await authApi.login(email, password)
        console.log(result)

        if (!result.ok) {
            console.log("Login Failed")
            return setLoginFailed(true)
        }
        setLoginFailed(false)
        console.log("Data =");
        console.log(result.data)
        try {
            const jsonData = JSON.stringify(result.data)
            await AsyncStorage.setItem('user', jsonData)
        } catch (e) {
            // saving error
        }
        authContext.setUser(result.data)
    }

    return (
        <Screen style={styles.container}>
            <Image style={styles.image} source={require("../assets/appicon.png")} />
            <View style={styles.form}>
                <Form
                    initialValues={{ email: "", password: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error="Invalid email or Password." visible={loginFailed} />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder="Email"
                        textContentType="emailAddress"
                        placeholderTextColor="#ecf0f1"
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
                        placeholderTextColor="#ecf0f1"
                        iconColor="#ecf0f1"
                    />
                    <SubmitButton title="Login" />
                </Form>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark
    },
    image: {
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginTop: 50,
        marginBottom: 20
    },
    form: {
        marginHorizontal: 15,
        marginTop: 40
    }

});

export default LoginScreen;
