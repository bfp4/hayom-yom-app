import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Pressable, View } from "react-native"
import NetInfo from "@react-native-community/netinfo"
import { NavigationCon, DateText } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import constants from "../../assets/constants"
import * as actions from "../../redux/actions"

import Card from "../card/Card"

function Navigation() {
    const dispatch = useDispatch()
    const nowDate = useSelector(state => state.nowDate)
    const nowDateText = useSelector(state => state.nowDateText)
    const nowHebrewDateText = useSelector(state => state.nowHebrewDateText)
    const loading = useSelector(state => state.loading)
    const [daysFromToday, setDaysFromToday] = useState(0)
    const [displayDateText, setDisplayDateText] = useState(nowDateText)
    const [displayHebrewDateText, setDisplayHebrewDateText] = useState(nowHebrewDateText)
    const iconColor = loading ? constants.colors.lightGray : constants.colors.blues
    const pendingRetry = useRef(false)

    const dayForward = () => {
        setDaysFromToday(prev => prev + 1)
    }

    const dayBack = () => {
        setDaysFromToday(prev => prev - 1)
    }

    const fetchHebrewDate = async (date) => {
        const res = await axios(`https://www.hebcal.com/converter?cfg=json&gy=${date.year}&gm=${date.month}&gd=${date.day}&g2h=1`)
        const data = await res.data
        await dispatch(actions.getData(data.hd, data.hm, data.hy))
        await dispatch(actions.changeLoading(false))
        pendingRetry.current = false
    }

    useEffect(() => {
        dispatch(actions.changeLoading(true))
        dispatch(actions.getNewDate(daysFromToday))
    }, [daysFromToday]) 

    const isNetworkError = (error) => !error.response

    useEffect(() => {
        if(!nowDateText) return
        ;(async () => {
            try {
                await fetchHebrewDate(nowDate)
            } catch (error) {
                console.error(error)
                if (isNetworkError(error)) {
                    pendingRetry.current = true
                }
            }
        })()
    }, [nowDateText])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && pendingRetry.current) {
                pendingRetry.current = false
                ;(async () => {
                    try {
                        await fetchHebrewDate(nowDate)
                    } catch (error) {
                        console.error(error)
                        if (isNetworkError(error)) {
                            pendingRetry.current = true
                        }
                    }
                })()
            }
        })
        return () => unsubscribe()
    }, [nowDate])

    useEffect(() => {
        if (!loading) {
            setDisplayDateText(nowDateText)
            setDisplayHebrewDateText(nowHebrewDateText)
        }
    }, [loading, nowDateText, nowHebrewDateText])

    return (
        <NavigationCon>
            <Pressable onPress={dayBack} hitSlop={8} disabled={loading}>
                <View>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} size={32} color={iconColor} />
                </View>
            </Pressable>

            <Card>
                <DateText>{displayDateText}{"\n"}{displayHebrewDateText}</DateText>
            </Card>

            <Pressable onPress={dayForward} hitSlop={8} disabled={loading}>
                <View>
                    <FontAwesomeIcon icon={faAngleDoubleRight} size={32} color={iconColor} />
                </View>
            </Pressable>
        </NavigationCon>   
    )
}

export default Navigation
