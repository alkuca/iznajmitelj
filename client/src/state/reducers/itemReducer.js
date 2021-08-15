const initialState = {
    item: null,
    items: {},
    loading: true,
    allItemsLoading: true,
    itemPosted: false,
    allItems: {},
    currentItem: {},
    rentedItem: {},
    rentedItems: {},
    rentedOutItems: {},
    rentedItemsLoading:true,
    rentedOutItemsLoading:true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_ITEMS":{
            return {
                ...state,
                allItems: action.payload,
                allItemsLoading: false
            }
        }
        case "GET_SINGLE_ITEM":{
            return {
                ...state,
                currentItem: action.payload
            }
        }
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
        case "RENT_ITEM":{
            return {
                ...state,
                rentedItem: action.payload
            }
        }
        case "GET_RENTED_ITEMS":{
            return {
                ...state,
                rentedItemsLoading: false,
                rentedItems: action.payload
            }
        }
        case "GET_RENTED_OUT_ITEMS":{
            return {
                ...state,
                rentedOutItemsLoading: false,
                rentedOutItems: action.payload
            }
        }
        default:
            return state
    }
}

export default reducer;