import React, { useMemo, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import constants from "../../assets/constants"
import {
    FULL_MONTH_NAMES,
    getYearRange,
    monthStartString,
    parseDateString,
} from "../../utils/dateHelpers"
import {
    MonthYearRow,
    SelectorButton,
    SelectorButtonText,
    PickerList,
    PickerOption,
    PickerOptionText,
} from "./styles"

export default function MonthYearPicker({ displayMonth, onChangeDisplayMonth }) {
    const [openPicker, setOpenPicker] = React.useState(null)
    const yearListRef = useRef(null)
    const { year, month } = parseDateString(displayMonth)
    const years = useMemo(() => getYearRange(), [])

    const togglePicker = (picker) => {
        setOpenPicker(current => current === picker ? null : picker)
    }

    const selectMonth = (monthIndex) => {
        onChangeDisplayMonth(monthStartString(year, monthIndex))
        setOpenPicker(null)
    }

    const selectYear = (nextYear) => {
        onChangeDisplayMonth(monthStartString(nextYear, month))
        setOpenPicker(null)
    }

    const onYearListLayout = () => {
        const index = years.indexOf(year)
        if (index > 0 && yearListRef.current) {
            yearListRef.current.scrollTo({ y: Math.max(0, (index - 2) * 41), animated: false })
        }
    }

    return (
        <>
            <MonthYearRow>
                <SelectorButton onPress={() => togglePicker("month")}>
                    <SelectorButtonText>{FULL_MONTH_NAMES[month - 1]}</SelectorButtonText>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        size={14}
                        color={constants.colors.blues}
                    />
                </SelectorButton>
                <SelectorButton onPress={() => togglePicker("year")}>
                    <SelectorButtonText>{year}</SelectorButtonText>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        size={14}
                        color={constants.colors.blues}
                    />
                </SelectorButton>
            </MonthYearRow>

            {openPicker === "month" && (
                <PickerList nestedScrollEnabled>
                    {FULL_MONTH_NAMES.map((name, index) => (
                        <PickerOption
                            key={name}
                            $selected={month === index + 1}
                            onPress={() => selectMonth(index + 1)}
                        >
                            <PickerOptionText $selected={month === index + 1}>
                                {name}
                            </PickerOptionText>
                        </PickerOption>
                    ))}
                </PickerList>
            )}

            {openPicker === "year" && (
                <PickerList
                    ref={yearListRef}
                    nestedScrollEnabled
                    onLayout={onYearListLayout}
                >
                    {years.map((optionYear) => (
                        <PickerOption
                            key={optionYear}
                            $selected={year === optionYear}
                            onPress={() => selectYear(optionYear)}
                        >
                            <PickerOptionText $selected={year === optionYear}>
                                {optionYear}
                            </PickerOptionText>
                        </PickerOption>
                    ))}
                </PickerList>
            )}
        </>
    )
}
