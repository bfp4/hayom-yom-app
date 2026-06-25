import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEYS } from "./storageKeys"

function bookmarkId(hebrewMonth, hebrewDay) {
    return `${hebrewMonth.toLowerCase()}-${hebrewDay}`
}

export async function getBookmarks() {
    const json = await AsyncStorage.getItem(STORAGE_KEYS.bookmarks)
    if (!json) return []
    try {
        return JSON.parse(json)
    } catch {
        return []
    }
}

export async function saveBookmarks(bookmarks) {
    await AsyncStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(bookmarks))
}

export async function toggleBookmark(entry) {
    const bookmarks = await getBookmarks()
    const id = bookmarkId(entry.hebrewMonth, entry.hebrewDay)
    const index = bookmarks.findIndex(b => b.id === id)

    if (index >= 0) {
        bookmarks.splice(index, 1)
    } else {
        bookmarks.unshift({
            id,
            hebrewMonth: entry.hebrewMonth,
            hebrewDay: entry.hebrewDay,
            hebrewDateText: entry.hebrewDateText,
            dateText: entry.dateText,
            gregorianDate: entry.gregorianDate,
            savedAt: Date.now(),
        })
    }

    await saveBookmarks(bookmarks)
    return bookmarks
}

export async function removeBookmarkById(id) {
    const bookmarks = await getBookmarks()
    const index = bookmarks.findIndex(b => b.id === id)
    if (index < 0) return bookmarks

    bookmarks.splice(index, 1)
    await saveBookmarks(bookmarks)
    return bookmarks
}

export function isEntryBookmarked(bookmarks, hebrewMonth, hebrewDay) {
    const id = bookmarkId(hebrewMonth, hebrewDay)
    return bookmarks.some(b => b.id === id)
}
