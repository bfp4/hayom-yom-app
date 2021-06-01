import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { ScrollView, HayomYomCon, EnglishText, HebrewText } from "./styles"
import Footer from "../footer/Footer"
import Modal from "../issue-modal/IssueModal"
import IssueModal from "../issue-modal/IssueModal"

function Body(props) {
    const { english, hebrew, modalVisibility } = props

    return (
        <View style={{height: "80%"}}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column'}}>
                <HayomYomCon>
                    <EnglishText>
                        {english}
                    </EnglishText>
                    <HebrewText>
                        {hebrew}
                    </HebrewText>
                </HayomYomCon>
                <Footer />
                <IssueModal visibility={modalVisibility} animationType="slide" />
            </ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        english: state.nowObject.hayomYom.english,
        hebrew: state.nowObject.hayomYom.hebrew,
        modalVisibility: state.modalVisibility
    }
}

export default connect(mapStateToProps)(Body)