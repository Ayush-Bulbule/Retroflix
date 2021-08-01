import React from 'react'
import { ImageBackground, StyleSheet, Image, Text, View } from 'react-native'
import Button from "../components/Button"
import colors from '../config/colors'

const WelcomeScreen = () => {
    return (
        <ImageBackground
            blurRadius={5}
            style={styles.background}
            source={require("../assets/webbg.png")}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/adaptive-iconweb.png")} />
                <Text style={styles.tagline}>Watch Webseries on the go!</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    title="Login"
                    style={styles.login}
                />
                <Button
                    title="SignUp"
                    color="black"
                />
            </View>


        </ImageBackground>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonsContainer: {
        padding: 20,
        width: "100%",
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
    tagline: {
        fontSize: 18,
        fontWeight: "600",
        paddingVertical: 20,
        color: colors.white

    },
    login: {
        paddingVertical: 12,
        backgroundColor: colors.primary
    },
    signup: {

    }
})

/*
onPress={() => navigation.navigate(routes.LOGIN)}
onPress={() => navigation.navigate(routes.REGISTER)}

 */