import React from "react"
import { View } from "react-native"
import { useFonts } from "expo-font"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBookmark, faShareNodes } from "@fortawesome/free-solid-svg-icons"

import constants from "../../assets/constants"
import { useBookmarks } from "../../hooks/useBookmarks"
import { useTextLayout } from "../../hooks/useTextLayout"
import { TEXT_LAYOUT } from "../../utils/textLayout"
import { shareHayomYom } from "../../utils/share"
import { ScrollView, HayomYomCon, EnglishText, HebrewText, StackDivider, StackDividerLine, StackDividerCircle } from "./styles"
import { ActionBar, ActionButton } from "./ActionBar"

function TextDivider() {
    return (
        <StackDivider>
            <StackDividerLine />
            <StackDividerCircle />
            <StackDividerLine />
        </StackDivider>
    )
}

export default function Body() {
    const [fontsLoaded] = useFonts({
        "lemonada-bold": require("../../assets/fonts/Lemonada-SemiBold.ttf"),
        "lemonada": require("../../assets/fonts/Lemonada-Regular.ttf"),
    })
    const english = useSelector(state => state.nowObject?.hayomYom?.english ?? "")
    const hebrew = useSelector(state => state.nowObject?.hayomYom?.hebrew ?? "")
    const nowDateText = useSelector(state => state.nowDateText)
    const nowHebrewDateText = useSelector(state => state.nowHebrewDateText)
    const nowDate = useSelector(state => state.nowDate)
    const nowHebrewDate = useSelector(state => state.nowHebrewDate)
    const { isBookmarked, toggle } = useBookmarks()
    const { layout } = useTextLayout()
    const stacked = layout !== TEXT_LAYOUT.sideBySide

    const bookmarked = nowHebrewDate
        ? isBookmarked(nowHebrewDate.month, nowHebrewDate.day)
        : false

    const onShare = () => {
        shareHayomYom({
            dateText: nowDateText,
            hebrewDateText: nowHebrewDateText,
            english,
            hebrew,
        })
    }

    const onToggleBookmark = () => {
        if (!nowHebrewDate) return

        toggle({
            hebrewMonth: nowHebrewDate.month,
            hebrewDay: nowHebrewDate.day,
            hebrewDateText: nowHebrewDateText,
            dateText: nowDateText,
            gregorianDate: nowDate,
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <ActionBar>
                <ActionButton onPress={onShare} hitSlop={8}>
                    <FontAwesomeIcon
                        icon={faShareNodes}
                        size={22}
                        color={constants.colors.blues}
                    />
                </ActionButton>
                <ActionButton onPress={onToggleBookmark} hitSlop={8}>
                    <FontAwesomeIcon
                        icon={faBookmark}
                        size={22}
                        color={bookmarked ? constants.colors.blues : constants.colors.lightGray}
                    />
                </ActionButton>
            </ActionBar>
            <ScrollView contentContainerStyle={{ justifyContent: "space-between", flexDirection: "column", paddingTop: 5, paddingBottom: 40 }}>
                <HayomYomCon $layout={layout}>
                    {layout === TEXT_LAYOUT.hebrewOverEnglish ? (
                        <>
                            <HebrewText $stacked={stacked} $fontLoaded={fontsLoaded}>{hebrew}</HebrewText>
                            {stacked && <TextDivider />}
                            <EnglishText $stacked={stacked} $fontLoaded={fontsLoaded}>{english}</EnglishText>
                        </>
                    ) : (
                        <>
                            <EnglishText $stacked={stacked} $fontLoaded={fontsLoaded}>{english}</EnglishText>
                            {stacked && <TextDivider />}
                            <HebrewText $stacked={stacked} $fontLoaded={fontsLoaded}>{hebrew}</HebrewText>
                        </>
                    )}
                </HayomYomCon>
            </ScrollView>
        </View>
    )
}
