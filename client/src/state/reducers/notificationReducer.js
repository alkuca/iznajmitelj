const initialState = {
    loading: true,
    notifications: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_NOTIFICATIONS": {
            return {
                ...state,
                loading: false,
                notifications: action.payload,
            }
        }
        case "CLEAR_USER_NOTIFICATIONS": {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}

export default reducer;