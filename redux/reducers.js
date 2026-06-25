import full from "../hayomYomsFull.json"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

function buildDateState(targetDate) {
    const day = targetDate.getDate()
    const monthIndex = targetDate.getMonth()
    const month = monthNames[monthIndex]
    const year = targetDate.getFullYear()
    const dateText = `${month} ${day}, ${year}`

    return {
        nowDateText: dateText,
        nowDate: {
            day,
            month: monthIndex + 1,
            year
        }
    }
}

const date = new Date()
const todayState = buildDateState(date)

const originalState = {
    fullArray: full,
    todayText: todayState.nowDateText,
    today: todayState.nowDate,
    nowDateText: todayState.nowDateText,
    nowDate: todayState.nowDate,
    loading: true,
    modalVisibility: false
}

const reducer = (state = originalState, action) => {
    switch (action.type) {
        case "SET_DATE": {
            const { day, month, year } = action.payload
            const targetDate = new Date(year, month - 1, day)
            return {
                ...state,
                ...buildDateState(targetDate)
            }
        }
        case "CHANGE_LOADING":
            return {
                ...state,
                loading: action.payload.bool
            }
        case "GET_DATA": {
            const nowHebrewDate = {
                day: action.payload.day,
                month: action.payload.month,
                year: action.payload.year
            };
            const nowHebrewDateText = `${nowHebrewDate.month} ${nowHebrewDate.day}, ${nowHebrewDate.year}`
            const nowObject = state.fullArray.find(entry => {
                return entry.date.month.toLowerCase() === nowHebrewDate.month.toLowerCase() && parseInt(entry.date.day) === parseInt(nowHebrewDate.day)
            })
            return {
                ...state,
                nowObject: nowObject,
                nowHebrewDate: nowHebrewDate,
                nowHebrewDateText: nowHebrewDateText
            }
        }
        default:
            return state;
    }
}

export default reducer
