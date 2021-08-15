const initialState = {
    newMessage: null,
    loading: true,
    messages: {},
    currentMessage: null,
    currentMessageLoading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_MESSAGES": {
            return {
                ...state,
                loading: false,
                messages: action.payload,
                currentMessageLoading: true
            }
        }
        case "SEND_MESSAGE": {
            return {
                ...state,
                newMessage: action.payload
            }
        }
        case "GET_SINGLE_MESSAGE": {
            return {
                ...state,
                currentMessage: action.payload,
                currentMessageLoading: false
            }
        }
        default:
            return state
    }
}

export default reducer;