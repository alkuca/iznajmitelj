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
        default:
            return state
    }
}

export default reducer;