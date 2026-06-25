import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEYS } from "./storageKeys"

export const TEXT_LAYOUT = {
    sideBySide: "side-by-side",
    hebrewOverEnglish: "hebrew-over-english",
    englishOverHebrew: "english-over-hebrew",
}

export const DEFAULT_TEXT_LAYOUT = TEXT_LAYOUT.sideBySide

export const TEXT_LAYOUT_OPTIONS = [
    { value: TEXT_LAYOUT.sideBySide, label: "Side by side" },
    { value: TEXT_LAYOUT.hebrewOverEnglish, label: "Hebrew over English" },
    { value: TEXT_LAYOUT.englishOverHebrew, label: "English over Hebrew" },
]

const VALID_LAYOUTS = new Set(Object.values(TEXT_LAYOUT))

export async function getTextLayout() {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.textLayout)
    if (value && VALID_LAYOUTS.has(value)) {
        return value
    }
    return DEFAULT_TEXT_LAYOUT
}

export async function saveTextLayout(layout) {
    if (!VALID_LAYOUTS.has(layout)) return
    await AsyncStorage.setItem(STORAGE_KEYS.textLayout, layout)
}
