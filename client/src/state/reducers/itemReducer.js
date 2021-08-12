const initialState = {
    item: null,
    items: {},
    loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE":
            return {
                item: action.payload
            }
        case "DELETE":{
            return{
                item: action.payload
            }
        }
        case "GET_USER_ITEMS":{
            return {
                items: action.payload,
                loading: false
            }
        }
        default:
            return state
    }
}

export default reducer;