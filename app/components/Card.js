import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker'
import colors from '../config/colors'
import defaultStyles from '../config/styles'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Text from './Text'
import { useNavigation } from '@react-navigation/core'
import routes from '../navigation/routes'
import AuthContext from '../auth/context'

const Card = ({ item, onPress, onEdit, admin, onDelete }) => {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Image source={{ uri: item.thumbnail }}
                    style={styles.image} />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
                    <Text style={styles.category}>Category: {item.category}</Text>
                    {admin && <View style={styles.options}>
                        <TouchableWithoutFeedback onPress={onEdit}>
                            <MaterialIcons name="edit" size={26} color={colors.white} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={onDelete} style={{ marginLeft: 20, position: 'relative' }}>
                            <MaterialIcons name="delete" size={26} color={colors.white} />
                        </TouchableWithoutFeedback>
                    </View>
                    }
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: colors.dark,
        width: '100%',
    },
    image: {
        width: 120,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 5,
        margin: 5
    },
    textWrapper: {
        width: '100%',
        margin: 10,
        flex: 1
    },
    titlewrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        color: colors.white,
        fontWeight: '600'

    },
    description: {
        fontSize: 12,
        color: colors.lightText,
        fontWeight: '300'
    },
    category: {
        fontSize: 12,
        color: colors.light,
        fontWeight: '300'
    },
    rating: {
        fontSize: 12,
        color: colors.light,
        fontWeight: '300'
    },
    options: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        position: 'relative',
        alignItems: 'center'
    }

})
