import React, { useState } from 'react';
import { connect } from "react-redux"

import LoadingIcon from "../loading-icon/LoadingIcon"
import Header from "../header/Header"
import Navigation from "../navigation/Navigation"
import Body from "../body/Body"
import { View } from 'react-native';

function Main(props){
    if(props.loading == true){
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

function mapStateToProps(state){
    return {
        loading: state.loading
    }
}

export default connect(mapStateToProps)(Main)
