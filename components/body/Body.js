import React from "react"
import { View } from 'react-native';
import { useSelector } from "react-redux"
import { ScrollView, HayomYomCon, EnglishText, HebrewText } from "./styles"

export default function Body() {
    const english = useSelector(state => state.nowObject?.hayomYom?.english ?? "")
    const hebrew = useSelector(state => state.nowObject?.hayomYom?.hebrew ?? "")

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', paddingTop: 5, paddingBottom: 40}}>
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
