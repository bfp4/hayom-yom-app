import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import * as Notifications from "expo-notifications"
import { useDispatch } from "react-redux"

import AppNavigator from "../../navigation/AppNavigator"
import { navigationRef, navigateToToday } from "../../navigation/navigationRef"
import { initializeNotifications } from "../../utils/notifications"
import { gregorianDateParts } from "../../utils/dateHelpers"
import * as actions from "../../redux/actions"

function NotificationHandler() {
    const dispatch = useDispatch()

    useEffect(() => {
        initializeNotifications()

        const responseListener = Notifications.addNotificationResponseReceivedListener(() => {
            const today = gregorianDateParts(new Date())
            dispatch(actions.setDate(today.day, today.month, today.year))
            dispatch(actions.changeLoading(true))
            navigateToToday()
        })

        return () => {
            responseListener.remove()
        }
    }, [dispatch])

    return null
}

const linking = {
    prefixes: ["hayomyomapp://"],
    config: {
        screens: {
            Today: "today",
            Favorites: "favorites",
            Settings: "settings",
        },
    },
}

export default function Main() {
    return (
        <SafeAreaProvider>
            <NavigationContainer ref={navigationRef} linking={linking}>
                <NotificationHandler />
                <AppNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
