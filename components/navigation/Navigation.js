import React, { useLayoutEffect, useEffect, useRef, useState } from "react"
import { Pressable, View } from "react-native"
import NetInfo from "@react-native-community/netinfo"
import { NavigationCon, DateText } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import constants from "../../assets/constants"
import * as actions from "../../redux/actions"

import Card from "../card/Card"
import CalendarModal from "../calendar/CalendarModal"
import { toDateString, offsetGregorianDate } from "../../utils/dateHelpers"
import { getCachedHebrewDate, fetchHebrewDate } from "../../utils/hebrewDateCache"

function Navigation() {
    const dispatch = useDispatch()
    const nowDate = useSelector(state => state.nowDate)
    const nowDateText = useSelector(state => state.nowDateText)
    const nowHebrewDateText = useSelector(state => state.nowHebrewDateText)
    const loading = useSelector(state => state.loading)
    const [calendarVisible, setCalendarVisible] = useState(false)
    const iconColor = loading ? constants.colors.lightGray : constants.colors.blues
    const pendingRetry = useRef(false)
    const requestIdRef = useRef(0)

    const setDateWithLoading = (day, month, year) => {
        const date = { day, month, year }
        if (!getCachedHebrewDate(date)) {
            dispatch(actions.changeLoading(true))
        }
        dispatch(actions.setDate(day, month, year))
    }

    const dayForward = () => {
        const next = offsetGregorianDate(nowDate, 1)
        setDateWithLoading(next.day, next.month, next.year)
    }

    const dayBack = () => {
        const prev = offsetGregorianDate(nowDate, -1)
        setDateWithLoading(prev.day, prev.month, prev.year)
    }

    const applyHebrewDate = (data) => {
        dispatch(actions.getData(data.hd, data.hm, data.hy))
        dispatch(actions.changeLoading(false))
        pendingRetry.current = false
    }

    const isNetworkError = (error) => !error.response

    useLayoutEffect(() => {
        if (!nowDate?.day) return

        const requestId = ++requestIdRef.current
        const isCurrentRequest = () => requestId === requestIdRef.current

        const cached = getCachedHebrewDate(nowDate)
        console.log("cached", cached)
        if (cached) {
            applyHebrewDate(cached)
            return
        }

        dispatch(actions.changeLoading(true))

        ;(async () => {
            try {
                const data = await fetchHebrewDate(nowDate)
                if (!isCurrentRequest()) return
                applyHebrewDate(data)
            } catch (error) {
                console.error(error)
                if (!isCurrentRequest()) return
                if (isNetworkError(error)) {
                    pendingRetry.current = true
                }
                dispatch(actions.changeLoading(false))
            }
        })()
    }, [nowDate.day, nowDate.month, nowDate.year, dispatch])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected || !pendingRetry.current) return

            pendingRetry.current = false
            const requestId = ++requestIdRef.current
            const isCurrentRequest = () => requestId === requestIdRef.current

            dispatch(actions.changeLoading(true))

            ;(async () => {
                try {
                    const data = await fetchHebrewDate(nowDate)
                    if (!isCurrentRequest()) return
                    applyHebrewDate(data)
                } catch (error) {
                    console.error(error)
                    if (!isCurrentRequest()) return
                    if (isNetworkError(error)) {
                        pendingRetry.current = true
                    }
                    dispatch(actions.changeLoading(false))
                }
            })()
        })
        return () => unsubscribe()
    }, [nowDate.day, nowDate.month, nowDate.year, dispatch])

    const onSelectDate = (day) => {
        const [year, month, dayNum] = day.dateString.split("-").map(Number)
        if (nowDate.day === dayNum && nowDate.month === month && nowDate.year === year) {
            setCalendarVisible(false)
            return
        }
        setDateWithLoading(dayNum, month, year)
        setCalendarVisible(false)
    }

    return (
        <NavigationCon>
            <Pressable onPress={dayBack} hitSlop={8} disabled={loading}>
                <View>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} size={32} color={iconColor} />
                </View>
            </Pressable>

            <Pressable
                onPress={() => setCalendarVisible(true)}
                hitSlop={8}
                disabled={loading}
                style={{ width: '50%', marginHorizontal: 15 }}
            >
                <Card>
                    <DateText>
                        {loading ? "" : `${nowDateText}\n${nowHebrewDateText}`}
                    </DateText>
                </Card>
            </Pressable>

            <Pressable onPress={dayForward} hitSlop={8} disabled={loading}>
                <View>
                    <FontAwesomeIcon icon={faAngleDoubleRight} size={32} color={iconColor} />
                </View>
            </Pressable>

            <CalendarModal
                visible={calendarVisible}
                initialDate={toDateString(nowDate)}
                onClose={() => setCalendarVisible(false)}
                onSelectDate={onSelectDate}
            />
        </NavigationCon>
    )
}

export default Navigation
