const initialState = {
    sidebarToggle : false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                sidebarToggle: !state.sidebarToggle
            }
        default:
            return state
    }
}

export default reducer;