import { useCallback, useEffect, useState } from "react"
import { DEFAULT_TEXT_LAYOUT, getTextLayout, saveTextLayout } from "../utils/textLayout"

let cachedLayout = DEFAULT_TEXT_LAYOUT
const listeners = new Set()

function notifyListeners(layout) {
    listeners.forEach(listener => listener(layout))
}

async function loadTextLayout() {
    const layout = await getTextLayout()
    cachedLayout = layout
    notifyListeners(layout)
    return layout
}

export function useTextLayout() {
    const [layout, setLayoutState] = useState(cachedLayout)

    useEffect(() => {
        const listener = nextLayout => setLayoutState(nextLayout)
        listeners.add(listener)
        loadTextLayout()

        return () => {
            listeners.delete(listener)
        }
    }, [])

    const setLayout = useCallback(async (nextLayout) => {
        await saveTextLayout(nextLayout)
        cachedLayout = nextLayout
        notifyListeners(nextLayout)
    }, [])

    return { layout, setLayout }
}
