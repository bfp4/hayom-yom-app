import React, { useEffect, useState } from "react"
import axios from "axios"
import { Pressable, View } from "react-native"
import { NavigationCon, DateText } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux"
import constants from "../../assets/constants"
import * as actions from "../../redux/actions"

import Card from "../card/Card"

function Navigation(props) {
    const { dispatch, nowDate, nowDateText, nowHebrewDateText } = props
    const [daysFromToday, setDaysFromToday] = useState(0)

    const dayForward = () => {
        setDaysFromToday(prev => prev + 1)
    }

    const dayBack = () => {
        setDaysFromToday(prev => prev - 1)
    }

    useEffect(() => {
        dispatch(actions.changeLoading(true))
        dispatch(actions.changeVisibility(false))
        dispatch(actions.getNewDate(daysFromToday))
    }, [daysFromToday]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(!nowDateText) return
        ;(async () => {
            try {
                const res = await axios(`https://www.hebcal.com/converter?cfg=json&gy=${nowDate.year}&gm=${nowDate.month}&gd=${nowDate.day}&g2h=1`)
                const data = await res.data
                await dispatch(actions.getData(data.hd, data.hm, data.hy))
                await dispatch(actions.changeLoading(false))
            } catch (error) {
                console.error(error)
            }
        })()
    }, [nowDateText]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <NavigationCon>
            <Pressable onPress={dayBack} hitSlop={8}>
                <View>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} size={32} color={constants.colors.blues} />
                </View>
            </Pressable>

            <Card>
                <DateText>{nowDateText}{"\n"}{nowHebrewDateText}</DateText>
            </Card>

            <Pressable onPress={dayForward} hitSlop={8}>
                <View>
                    <FontAwesomeIcon icon={faAngleDoubleRight} size={32} color={constants.colors.blues} />
                </View>
            </Pressable>
        </NavigationCon>    )
}

function mapStateToProps(state) {
    return {
        nowDate: state.nowDate,
        nowDateText: state.nowDateText,
        nowHebrewDateText: state.nowHebrewDateText,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
