import React, { useContext, useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AuthContext from '../auth/context'
import Screen from '../components/Screen'
import colors from '../config/colors'
import Button from '../components/Button'
import Text from '../components/Text'

const ProfileScreen = () => {
    const { user, setUser } = useContext(AuthContext);

    const logOut = async () => {
        setUser(null)
        try {
            await AsyncStorage.removeItem('user')
        } catch (e) {
            // remove error
        }
        console.log('Done.')
    }

    useEffect(() => {
        console.log(user)
    }, [])
    return (
        <Screen style={styles.container}>
            <Image style={styles.image} source={require("../assets/appname.png")} />
            <Text style={styles.heading}>Profile Id: {user.id}</Text>
            <Image style={styles.avatar} source={require("../assets/avatar.png")} />
            <Text style={styles.text}>Name: {user.name}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Button title="LogOut" style={styles.button} onPress={logOut}></Button>
        </Screen>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.dark
    },
    text: {
        fontSize: 19,
        textAlign: 'center',
        marginBottom: 20
    },
    heading: {
        marginTop: 50,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700'
    },
    avatar: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20

    },
    button: {
        marginTop: 40,
        marginHorizontal: 20,
        backgroundColor: colors.primary,
        position: 'relative'

    },
    image: {
        width: '100%',
        height: 40,
        resizeMode: 'contain',

    }
})
