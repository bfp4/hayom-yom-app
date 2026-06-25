const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const FULL_MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

export function gregorianDateParts(date) {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    }
}

export function offsetGregorianDate({ day, month, year }, offset) {
    const date = new Date(year, month - 1, day)
    date.setDate(date.getDate() + offset)
    return gregorianDateParts(date)
}

export function formatGregorianDate(date) {
    const day = date.getDate()
    const month = MONTH_NAMES[date.getMonth()]
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
}

export function daysBetween(fromDate, toDate) {
    const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
    const end = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
    return Math.round((end - start) / 86400000)
}

export function toDateString({ day, month, year }) {
    const paddedMonth = String(month).padStart(2, "0")
    const paddedDay = String(day).padStart(2, "0")
    return `${year}-${paddedMonth}-${paddedDay}`
}

export function parseDateString(dateString) {
    const [year, month, day] = dateString.split("-").map(Number)
    return { year, month, day }
}

export function clampDayInMonth(year, month, day) {
    const maxDay = new Date(year, month, 0).getDate()
    return Math.min(day, maxDay)
}

export function monthStartString(year, month) {
    return toDateString({ year, month, day: 1 })
}

export function getYearRange(startOffset = -50, endOffset = 10) {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear + startOffset; year <= currentYear + endOffset; year++) {
        years.push(year)
    }
    return years
}

export function todayDateString() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

export function formatTime(hour, minute) {
    const date = new Date()
    date.setHours(hour, minute, 0, 0)
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}
