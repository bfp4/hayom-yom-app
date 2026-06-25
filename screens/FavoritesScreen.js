import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Alert, FlatList } from "react-native"

import * as actions from "../redux/actions"
import { useBookmarks } from "../hooks/useBookmarks"
import { setCachedHebrewDate } from "../utils/hebrewDateCache"
import full from "../hayomYomsFull.json"
import {
    ScreenContainer,
    EmptyText,
    FavoriteItem,
    FavoriteDate,
    FavoritePreview,
} from "./styles"

function getPreview(hebrewMonth, hebrewDay) {
    const entry = full.find(item =>
        item.date.month.toLowerCase() === hebrewMonth.toLowerCase() &&
        parseInt(item.date.day) === parseInt(hebrewDay)
    )
    const text = entry?.hayomYom?.english ?? ""
    return text.length > 120 ? `${text.slice(0, 120).trim()}…` : text
}

function parseHebrewYear(hebrewDateText) {
    const year = hebrewDateText?.split(", ").pop()?.trim()
    if (!year || !/^\d+$/.test(year)) return null
    return year
}

function hasGregorianDate(gregorianDate) {
    return gregorianDate?.day && gregorianDate?.month && gregorianDate?.year
}

function hasHebrewDate(hebrewMonth, hebrewDay, hebrewYear) {
    return hebrewMonth && hebrewDay && hebrewYear
}

function isValidBookmark(bookmark) {
    const hebrewYear = parseHebrewYear(bookmark.hebrewDateText)
    return hasGregorianDate(bookmark.gregorianDate)
        && hasHebrewDate(bookmark.hebrewMonth, bookmark.hebrewDay, hebrewYear)
}

export default function FavoritesScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { bookmarks, loading, refresh, remove } = useBookmarks()

    useFocusEffect(
        useCallback(() => {
            refresh()
        }, [refresh])
    )

    const openBookmark = async (bookmark) => {
        if (!isValidBookmark(bookmark)) {
            await remove(bookmark.id)
            Alert.alert(
                "Couldn't open favorite",
                "This favorite was incomplete or corrupted and has been removed.",
            )
            return
        }

        const { gregorianDate, hebrewMonth, hebrewDay, hebrewDateText } = bookmark
        const hebrewYear = parseHebrewYear(hebrewDateText)

        setCachedHebrewDate(gregorianDate, {
            hd: hebrewDay,
            hm: hebrewMonth,
            hy: hebrewYear,
        })
        dispatch(actions.setDate(
            gregorianDate.day,
            gregorianDate.month,
            gregorianDate.year
        ))
        dispatch(actions.getData(hebrewDay, hebrewMonth, hebrewYear))
        navigation.navigate("Today")
    }

    if (!loading && bookmarks.length === 0) {
        return (
            <ScreenContainer>
                <EmptyText>No favorites yet.{"\n"}Tap the bookmark icon on any entry to save it here.</EmptyText>
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer>
            <FlatList
                data={bookmarks}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                renderItem={({ item }) => (
                    <FavoriteItem onPress={() => openBookmark(item)}>
                        <FavoriteDate>{item.dateText}{"\n"}{item.hebrewDateText}</FavoriteDate>
                        <FavoritePreview>{getPreview(item.hebrewMonth, item.hebrewDay)}</FavoritePreview>
                    </FavoriteItem>
                )}
                ListEmptyComponent={loading ? null : (
                    <EmptyText>No favorites yet.</EmptyText>
                )}
            />
        </ScreenContainer>
    )
}
