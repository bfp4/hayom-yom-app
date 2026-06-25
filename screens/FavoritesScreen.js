import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Alert, ScrollView } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import * as actions from "../redux/actions"
import constants from "../assets/constants"
import { useBookmarks } from "../hooks/useBookmarks"
import { setCachedHebrewDate } from "../utils/hebrewDateCache"
import full from "../hayomYomsFull.json"
import {
    ScreenContainer,
    EmptyText,
    FavoriteItem,
    FavoriteDate,
    FavoritePreview,
    FavoriteYearSection,
    FavoriteYearToggle,
    FavoriteYearToggleLeft,
    FavoriteYearTitle,
    FavoriteYearCount,
    FavoriteYearItems,
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

function getBookmarkYear(bookmark) {
    if (bookmark.gregorianDate?.year) {
        return String(bookmark.gregorianDate.year)
    }
    return parseHebrewYear(bookmark.hebrewDateText) ?? "Unknown"
}

function groupBookmarksByYear(bookmarks) {
    const groups = {}

    for (const bookmark of bookmarks) {
        const year = getBookmarkYear(bookmark)
        if (!groups[year]) groups[year] = []
        groups[year].push(bookmark)
    }

    return Object.entries(groups)
        .sort(([a], [b]) => {
            if (a === "Unknown") return 1
            if (b === "Unknown") return -1
            return Number(b) - Number(a)
        })
        .map(([year, data]) => ({
            title: year,
            data: data.sort((a, b) => (b.savedAt ?? 0) - (a.savedAt ?? 0)),
        }))
}

export default function FavoritesScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { bookmarks, loading, refresh, remove } = useBookmarks()
    const sections = useMemo(() => groupBookmarksByYear(bookmarks), [bookmarks])
    const [expandedYears, setExpandedYears] = useState(() => new Set())

    useEffect(() => {
        if (sections.length === 0) return

        setExpandedYears(current => {
            if (current.size > 0) return current
            return new Set([sections[0].title])
        })
    }, [sections])

    const toggleYear = (year) => {
        setExpandedYears(current => {
            const next = new Set(current)
            if (next.has(year)) next.delete(year)
            else next.add(year)
            return next
        })
    }

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
        navigation.navigate("Hayom Yom")
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
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {sections.map(section => {
                    const expanded = expandedYears.has(section.title)

                    return (
                        <FavoriteYearSection key={section.title}>
                            <FavoriteYearToggle onPress={() => toggleYear(section.title)}>
                                <FavoriteYearToggleLeft>
                                    <FontAwesomeIcon
                                        icon={expanded ? faChevronDown : faChevronRight}
                                        size={12}
                                        color={constants.colors.blues}
                                    />
                                    <FavoriteYearTitle>{section.title}</FavoriteYearTitle>
                                </FavoriteYearToggleLeft>
                                <FavoriteYearCount>{section.data.length}</FavoriteYearCount>
                            </FavoriteYearToggle>
                            {expanded && (
                                <FavoriteYearItems>
                                    {section.data.map(item => (
                                        <FavoriteItem key={item.id} onPress={() => openBookmark(item)}>
                                            <FavoriteDate>
                                                {item.dateText} · {item.hebrewDateText}
                                            </FavoriteDate>
                                            <FavoritePreview numberOfLines={1}>
                                                {getPreview(item.hebrewMonth, item.hebrewDay)}
                                            </FavoritePreview>
                                        </FavoriteItem>
                                    ))}
                                </FavoriteYearItems>
                            )}
                        </FavoriteYearSection>
                    )
                })}
                {!loading && sections.length === 0 && (
                    <EmptyText>No favorites yet.</EmptyText>
                )}
            </ScrollView>
        </ScreenContainer>
    )
}
