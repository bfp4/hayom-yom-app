import { Share } from "react-native"

export function formatShareMessage({ dateText, hebrewDateText, english, hebrew }) {
    const lines = [`Hayom Yom – ${dateText}`]

    if (hebrewDateText) {
        lines[0] += ` (${hebrewDateText})`
    }

    if (english) {
        lines.push("", english.trim())
    }

    if (hebrew) {
        lines.push("", hebrew.trim())
    }

    return lines.join("\n")
}

export async function shareHayomYom(entry) {
    const message = formatShareMessage(entry)

    await Share.share({
        message,
        title: "Hayom Yom",
    })
}
