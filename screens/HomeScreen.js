import React from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"

import LoadingIcon from "../components/loading-icon/LoadingIcon"
import Navigation from "../components/navigation/Navigation"
import Body from "../components/body/Body"

export default function HomeScreen() {
    const loading = useSelector(state => state.loading)

    return (
        <View style={{ flex: 1 }}>
            <Navigation />
            {loading ? (
                <LoadingIcon />
            ) : (
                <Body />
            )}
        </View>
    )
}
