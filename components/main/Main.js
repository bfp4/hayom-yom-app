import React, { useState } from 'react';
import { connect } from "react-redux"

import LoadingIcon from "../loading-icon/LoadingIcon"
import Header from "../header/Header"
import Navigation from "../navigation/Navigation"
import Body from "../body/Body"
import Footer from "../footer/Footer"
import { View, ScrollView } from 'react-native';

function Main(props){
    if(props.loading == true){
        return (
            <View>
                <Header />
                <Navigation />
                <LoadingIcon size="70%" />
            </View>
        )
    }

    return (
        <View>
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
