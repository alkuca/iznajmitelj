export const createItem = (item) => {
    return (dispatch) => {
        dispatch({
            type: "create",
            payload: item
        })
    }
}

export const deleteItem = (item) => {
    return (dispatch) => {
        dispatch({
            type: "delete",
            payload: item
        })
    }
}