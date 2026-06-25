import axios from "axios"

const cache = new Map()

export function dateKey(date) {
    return `${date.year}-${date.month}-${date.day}`
}

export function getCachedHebrewDate(date) {
    return cache.get(dateKey(date))
}

export function setCachedHebrewDate(date, data) {
    cache.set(dateKey(date), data)
}

export async function fetchHebrewDate(date) {
    const res = await axios(
        `https://www.hebcal.com/converter?cfg=json&gy=${date.year}&gm=${date.month}&gd=${date.day}&g2h=1`
    )
    const data = await res.data
    setCachedHebrewDate(date, data)
    return data
}
