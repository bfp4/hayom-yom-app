import React, { useLayoutEffect, useEffect, useRef, useState, useCallback } from "react"
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
import { toDateString, offsetGregorianDate, parseDateString } from "../../utils/dateHelpers"
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
    const nowDateRef = useRef(nowDate)
    const cachedResultRef = useRef(null)
    nowDateRef.current = nowDate

    const setDateWithLoading = useCallback((day, month, year) => {
        const date = { day, month, year }
        const cached = getCachedHebrewDate(date)
        cachedResultRef.current = cached
        if (!cached) {
            dispatch(actions.changeLoading(true))
        }
        dispatch(actions.setDate(day, month, year))
    }, [dispatch])

    const dayForward = useCallback(() => {
        const next = offsetGregorianDate(nowDate, 1)
        setDateWithLoading(next.day, next.month, next.year)
    }, [nowDate, setDateWithLoading])

    const dayBack = useCallback(() => {
        const prev = offsetGregorianDate(nowDate, -1)
        setDateWithLoading(prev.day, prev.month, prev.year)
    }, [nowDate, setDateWithLoading])

    const applyHebrewDate = (data) => {
        dispatch(actions.getData(data.hd, data.hm, data.hy))
        dispatch(actions.changeLoading(false))
        pendingRetry.current = false
    }

    const isNetworkError = (error) => !!error.request && !error.response

    const makeIsCurrentRequest = () => {
        const requestId = ++requestIdRef.current
        return () => requestId === requestIdRef.current
    }

    const fetchAndApply = async (date, isCurrentRequest) => {
        try {
            const data = await fetchHebrewDate(date)
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
    }

    useLayoutEffect(() => {
        if (!nowDate?.day) return

        const isCurrentRequest = makeIsCurrentRequest()

        const cached = cachedResultRef.current ?? getCachedHebrewDate(nowDate)
        cachedResultRef.current = null
        if (cached) {
            applyHebrewDate(cached)
            return
        }

        dispatch(actions.changeLoading(true))
        fetchAndApply(nowDate, isCurrentRequest)
    }, [nowDate?.day, nowDate?.month, nowDate?.year, dispatch])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected || !pendingRetry.current) return

            pendingRetry.current = false
            const isCurrentRequest = makeIsCurrentRequest()

            dispatch(actions.changeLoading(true))
            fetchAndApply(nowDateRef.current, isCurrentRequest)
        })
        return () => unsubscribe()
    }, [dispatch])

    const onSelectDate = (day) => {
        const { year, month, day: dayNum } = parseDateString(day.dateString)
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
