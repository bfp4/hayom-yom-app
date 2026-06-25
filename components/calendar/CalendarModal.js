import React, { useEffect, useMemo, useState } from "react"
import { Modal, Pressable, StyleSheet, View } from "react-native"
import { Calendar } from "react-native-calendars"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import constants from "../../assets/constants"
import { monthStartString, parseDateString, todayDateString } from "../../utils/dateHelpers"
import MonthYearPicker from "./MonthYearPicker"
import {
    ModalCard,
    ModalHeader,
    ModalTitle,
    CloseButton,
    TodayButton,
    TodayButtonText,
} from "./styles"

export default function CalendarModal({ visible, initialDate, onClose, onSelectDate }) {
    const [selectedDate, setSelectedDate] = useState(initialDate)
    const [displayMonth, setDisplayMonth] = useState(initialDate)

    useEffect(() => {
        if (visible) {
            setSelectedDate(initialDate)
            const { year, month } = parseDateString(initialDate)
            setDisplayMonth(monthStartString(year, month))
        }
    }, [visible, initialDate])

    const markedDates = useMemo(() => {
        const today = todayDateString()
        const dates = {
            [today]: {
                marked: true,
                dotColor: constants.colors.blues,
                ...(selectedDate === today ? {
                    selected: true,
                    selectedColor: constants.colors.blues,
                } : {}),
            },
        }

        if (selectedDate !== today) {
            dates[selectedDate] = {
                selected: true,
                selectedColor: constants.colors.blues,
            }
        }

        return dates
    }, [selectedDate])

    const onDayPress = (day) => {
        setSelectedDate(day.dateString)
        const { year, month } = parseDateString(day.dateString)
        setDisplayMonth(monthStartString(year, month))
        onSelectDate(day)
    }

    const goToToday = () => {
        const today = todayDateString()
        setSelectedDate(today)
        const { year, month } = parseDateString(today)
        setDisplayMonth(monthStartString(year, month))
        onSelectDate({ dateString: today })
    }

    const onMonthChange = (date) => {
        setDisplayMonth(monthStartString(date.year, date.month))
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
                <ModalCard>
                    <ModalHeader>
                        <ModalTitle>Pick a date</ModalTitle>
                        <CloseButton onPress={onClose} hitSlop={8}>
                            <FontAwesomeIcon
                                icon={faXmark}
                                size={20}
                                color={constants.colors.blues}
                            />
                        </CloseButton>
                    </ModalHeader>

                    <MonthYearPicker
                        displayMonth={displayMonth}
                        onChangeDisplayMonth={setDisplayMonth}
                    />

                    <Calendar
                        key={displayMonth}
                        current={displayMonth}
                        onDayPress={onDayPress}
                        onMonthChange={onMonthChange}
                        markedDates={markedDates}
                        hideArrows
                        theme={{
                            todayTextColor: constants.colors.blues,
                            selectedDayBackgroundColor: constants.colors.blues,
                            selectedDayTextColor: "#ffffff",
                            arrowColor: constants.colors.blues,
                            monthTextColor: "black",
                            textDayFontFamily: "lemonada",
                            textMonthFontFamily: "lemonada-bold",
                            textDayHeaderFontFamily: "lemonada",
                        }}
                        enableSwipeMonths
                        renderHeader={() => null}
                    />
                    <TodayButton onPress={goToToday}>
                        <TodayButtonText>Today</TodayButtonText>
                    </TodayButton>
                </ModalCard>
            </View>
        </Modal>
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
