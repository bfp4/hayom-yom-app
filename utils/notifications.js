import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"
import { STORAGE_KEYS } from "./storageKeys"

const DEFAULT_TIME = { hour: 8, minute: 0 }

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
})

export async function registerForNotifications() {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("daily-hayom-yom", {
            name: "Daily Hayom Yom",
            importance: Notifications.AndroidImportance.DEFAULT,
        })
    }

    if (!Device.isDevice) {
        return false
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }

    return finalStatus === "granted"
}

export async function getNotificationTime() {
    const json = await AsyncStorage.getItem(STORAGE_KEYS.notificationTime)
    if (!json) return { ...DEFAULT_TIME }

    try {
        return JSON.parse(json)
    } catch {
        return { ...DEFAULT_TIME }
    }
}

export async function saveNotificationTime(hour, minute) {
    await AsyncStorage.setItem(
        STORAGE_KEYS.notificationTime,
        JSON.stringify({ hour, minute })
    )
    await scheduleDailyNotification(hour, minute)
}

export async function scheduleDailyNotification(hour, minute) {
    await Notifications.cancelAllScheduledNotificationsAsync()

    const granted = await registerForNotifications()
    if (!granted) return false

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Hayom Yom",
            body: "Learn Today's Hayom Yom",
            data: { screen: "Hayom Yom" },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour,
            minute,
        },
    })

    return true
}

export async function initializeNotifications() {
    const { hour, minute } = await getNotificationTime()
    return scheduleDailyNotification(hour, minute)
}
