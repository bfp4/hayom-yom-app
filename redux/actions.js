export const getNewDate = daysFromToday => {
    return {
        type: "GET_NEW_DATE",
        payload: {
            daysFromToday: daysFromToday
        }
    }
}

export const getData = (day, month, year) => {
    return {
        type: "GET_DATA",
        payload: {
            day: day,
            month: month,
            year: year
        }
    }
}

export const changeLoading = bool => {
    return {
        type: "CHANGE_LOADING",
        payload: {
            bool: bool
        }
    }
}

export const changeVisibility = bool => {
    return {
        type: "CHANGE_VISIBILITY",
        payload: {
            bool: bool
        }
    }
}
