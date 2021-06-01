import full from "../hayomYomsFull.json"
const date = new Date()
const day = date.getDate()
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const getMonth = date.getMonth()
const month = monthNames[getMonth]
const year = date.getFullYear()
const today = `${month} ${day}, ${year}`

const originalState = {
    fullArray: full,
    todayText: today,
    today: {
        day: day,
        month: getMonth + 1,
        year: year
    },
    loading: true,
    modalVisibility: false
}

export default reducer = (state = originalState, action) => {
    switch (action.type) {
        case "GET_NEW_DATE":
            const nowObj = new Date()
            nowObj.setDate(nowObj.getDate() + action.payload.daysFromToday)
            const nowDay = nowObj.getDate()
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const getNowMonth = nowObj.getMonth()
            const nowMonth = monthNames[getNowMonth]
            const nowYear = nowObj.getFullYear()
            const nowDate = `${nowMonth} ${nowDay}, ${nowYear}`
            return {
                ...state,
                nowDateText: nowDate,
                nowDate: {
                    day: nowDay,
                    month: getNowMonth + 1,
                    year: nowYear
                }
            }
        case "CHANGE_LOADING":
            return {
                ...state,
                loading: action.payload.bool
            }
        case "CHANGE_VISIBILITY":
            return {
                ...state,
                modalVisibility: action.payload.bool
            }
        case "GET_DATA":
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
        default:
            return state;
    }
}