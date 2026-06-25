import React, { useCallback, useState } from "react"
import { Modal, Pressable, StyleSheet, View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useFocusEffect } from "@react-navigation/native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import constants from "../assets/constants"
import {
    ModalCard,
    ModalHeader,
    ModalTitle,
    CloseButton,
} from "../components/calendar/styles"
import { useTextLayout } from "../hooks/useTextLayout"
import { formatTime } from "../utils/dateHelpers"
import {
    getNotificationTime,
    saveNotificationTime,
} from "../utils/notifications"
import { TEXT_LAYOUT_OPTIONS } from "../utils/textLayout"
import {
    ScreenContainer,
    ScreenContent,
    SettingsSection,
    SettingsLabel,
    SettingsDescription,
    TimeButton,
    TimeButtonText,
    LayoutOption,
    LayoutOptionText,
} from "./styles"

export default function SettingsScreen() {
    const [hour, setHour] = useState(8)
    const [minute, setMinute] = useState(0)
    const [showPicker, setShowPicker] = useState(false)
    const [pendingTime, setPendingTime] = useState({ hour: 8, minute: 0 })
    const [permissionDenied, setPermissionDenied] = useState(false)
    const { layout, setLayout } = useTextLayout()

    const loadTime = useCallback(async () => {
        const saved = await getNotificationTime()
        setHour(saved.hour)
        setMinute(saved.minute)
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadTime()
        }, [loadTime])
    )

    const openPicker = () => {
        setPendingTime({ hour, minute })
        setShowPicker(true)
    }

    const closePicker = () => {
        setShowPicker(false)
    }

    const pickerValue = new Date()
    pickerValue.setHours(pendingTime.hour, pendingTime.minute, 0, 0)

    const onTimeChange = (event, selectedDate) => {
        if (event.type === "dismissed" || !selectedDate) {
            return
        }

        setPendingTime({
            hour: selectedDate.getHours(),
            minute: selectedDate.getMinutes(),
        })
    }

    const onConfirmTime = async () => {
        setHour(pendingTime.hour)
        setMinute(pendingTime.minute)

        const scheduled = await saveNotificationTime(pendingTime.hour, pendingTime.minute)
        setPermissionDenied(!scheduled)
        setShowPicker(false)
    }

    return (
        <ScreenContainer>
            <ScreenContent contentContainerStyle={{ paddingBottom: 40 }}>
                <SettingsSection>
                    <SettingsLabel>Text Layout</SettingsLabel>
                    <SettingsDescription>
                        Choose how the English and Hebrew text is displayed on the home screen.
                    </SettingsDescription>
                    {TEXT_LAYOUT_OPTIONS.map(option => (
                        <LayoutOption
                            key={option.value}
                            $selected={layout === option.value}
                            onPress={() => setLayout(option.value)}
                        >
                            <LayoutOptionText $selected={layout === option.value}>
                                {option.label}
                            </LayoutOptionText>
                        </LayoutOption>
                    ))}
                </SettingsSection>
                <SettingsSection>
                    <SettingsLabel>Daily Reminder</SettingsLabel>
                    <SettingsDescription>
                        Choose what time you would like to receive a daily reminder that today&apos;s Hayom Yom is ready.
                    </SettingsDescription>
                    <TimeButton onPress={openPicker}>
                        <TimeButtonText>{formatTime(hour, minute)}</TimeButtonText>
                    </TimeButton>
                    {permissionDenied && (
                        <SettingsDescription style={{ marginTop: 12, color: "#c0392b" }}>
                            Notification permission was denied. Enable notifications in your device settings to receive daily reminders.
                        </SettingsDescription>
                    )}
                </SettingsSection>

            </ScreenContent>

            <Modal
                visible={showPicker}
                transparent
                animationType="fade"
                onRequestClose={closePicker}
            >
                <View style={styles.overlay}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={closePicker} />
                    <ModalCard>
                        <ModalHeader>
                            <ModalTitle>Reminder time</ModalTitle>
                            <CloseButton onPress={closePicker} hitSlop={8}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={20}
                                    color={constants.colors.blues}
                                />
                            </CloseButton>
                        </ModalHeader>
                        <DateTimePicker
                            value={pickerValue}
                            mode="time"
                            display="spinner"
                            onChange={onTimeChange}
                        />
                        <TimeButton onPress={onConfirmTime} style={{ marginTop: 8 }}>
                            <TimeButtonText>Done</TimeButtonText>
                        </TimeButton>
                    </ModalCard>
                </View>
            </Modal>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
})