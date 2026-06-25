import { useCallback, useEffect, useState } from "react"
import { getBookmarks, isEntryBookmarked, removeBookmarkById, toggleBookmark } from "../utils/bookmarks"

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState([])
    const [loading, setLoading] = useState(true)

    const refresh = useCallback(async () => {
        const data = await getBookmarks()
        setBookmarks(data)
        setLoading(false)
    }, [])

    useEffect(() => {
        refresh()
    }, [refresh])

    const toggle = useCallback(async (entry) => {
        const updated = await toggleBookmark(entry)
        setBookmarks(updated)
        return updated
    }, [])

    const remove = useCallback(async (id) => {
        const updated = await removeBookmarkById(id)
        setBookmarks(updated)
        return updated
    }, [])

    const checkBookmarked = useCallback((hebrewMonth, hebrewDay) => {
        return isEntryBookmarked(bookmarks, hebrewMonth, hebrewDay)
    }, [bookmarks])

    return {
        bookmarks,
        loading,
        toggle,
        remove,
        refresh,
        isBookmarked: checkBookmarked,
    }
}
