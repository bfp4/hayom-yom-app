import React from "react"
import { View } from 'react-native';
import { connect } from "react-redux"
import { ScrollView, HayomYomCon, EnglishText, HebrewText } from "./styles"

function Body(props) {
    const { english, hebrew } = props

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column'}}>
                <HayomYomCon>
                    <EnglishText>
                        {english}
                    </EnglishText>
                    <HebrewText>
                        {hebrew}
                    </HebrewText>
                </HayomYomCon>
            </ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        english: state.nowObject.hayomYom.english,
        hebrew: state.nowObject.hayomYom.hebrew
    }
}

export default connect(mapStateToProps)(Body)