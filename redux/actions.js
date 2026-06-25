export const setDate = (day, month, year) => ({
    type: "SET_DATE",
    payload: { day, month, year },
})
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
