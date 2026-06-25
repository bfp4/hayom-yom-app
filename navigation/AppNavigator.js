import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
    faBookOpen,
    faHeart,
    faBell,
} from "@fortawesome/free-solid-svg-icons"

import constants from "../assets/constants"
import Header from "../components/header/Header"
import HomeScreen from "../screens/HomeScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import SettingsScreen from "../screens/SettingsScreen"

const Tab = createBottomTabNavigator()

function withHeader(ScreenComponent) {
    return function ScreenWithHeader(props) {
        return (
            <>
                <Header />
                <ScreenComponent {...props} />
            </>
        )
    }
}

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: constants.colors.blues,
                tabBarInactiveTintColor: constants.colors.darkGray,
                tabBarLabelStyle: {
                    fontSize: 11,
                },
                tabBarIcon: ({ color, size }) => {
                    const icons = {
                        "Hayom Yom": faBookOpen,
                        Favorites: faHeart,
                        Settings: faBell,
                    }
                    return (
                        <FontAwesomeIcon
                            icon={icons[route.name]}
                            size={size - 2}
                            color={color}
                        />
                    )
                },
            })}
        >
            <Tab.Screen
                name="Hayom Yom"
                component={withHeader(HomeScreen)}
            />
            <Tab.Screen
                name="Favorites"
                component={withHeader(FavoritesScreen)}
            />
            <Tab.Screen
                name="Settings"
                component={withHeader(SettingsScreen)}
            />
        </Tab.Navigator>
    )
}
