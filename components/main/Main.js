import React from 'react';
import { useSelector } from "react-redux"

import LoadingIcon from "../loading-icon/LoadingIcon"
import Header from "../header/Header"
import Navigation from "../navigation/Navigation"
import Body from "../body/Body"
import { View } from 'react-native';

function Main(){
    const loading = useSelector(state => state.loading)

    if(loading == true){
        return (
            <View style={{height: "100%"}}>
                <Header />
                <Navigation />
                <LoadingIcon />
            </View>
        )
    }

    return (
        <View style={{height: "100%"}}>
            <Header />
            <Navigation />
            <Body />
        </View>
    )
}

export default Main
