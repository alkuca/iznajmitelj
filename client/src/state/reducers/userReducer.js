const initialState = {
    currentUser: {},
    singleUser: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            }
        case "GET_SINGLE_USER":
            return {
                ...state,
                singleUser: action.payload
            }
        case "EDIT_PROFILE":
            return {
                ...state
            }
        case "CHANGE_AVATAR":
            return {
                ...state
            }
        default:
            return state
    }
}

export default reducer;