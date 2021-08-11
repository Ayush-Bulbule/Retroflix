import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';


import AccountNavigator from "./AccountNavigator";
import routes from "./routes";
import HomeNavigator from "./HomeNavigator";
import AuthNavigator from "./AuthNavigator";
import MovieListingScreen from "../screens/MovieListingScreen";
import AuthContext from "../auth/context";
import AddMovieScreen from "../screens/admin/AddMovieScreen";
import AdminNavigator from "./AdminNavigator";


const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    const { user } = useContext(AuthContext);
    console.log(user.name)

    if (user.id == 6) {

        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="home" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Movies"
                    component={MovieListingScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="video-library" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={AccountNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="user-circle" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="AddMovie"
                    component={AdminNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="plus-circle" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    } else {
        return (<Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Movies"
                component={MovieListingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="video-library" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-circle" size={24} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
        )
    }
};

export default AppNavigator;
