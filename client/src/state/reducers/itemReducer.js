const initialState = {
    item: null,
    items: {},
    loading: true,
    itemPosted: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE":
            return {
                ...state,
                item: action.payload,
                loading: true,
            }
        case "DELETE":{
            return{
                item: action.payload
            }
        }
        case "GET_USER_ITEMS":{
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        }
        case "POST_ITEM":{
            return {
                ...state
            }
        }
        case "REMOVE_POST":{
            return {
                ...state
            }
        }
        default:
            return state
    }
}

export default reducer;