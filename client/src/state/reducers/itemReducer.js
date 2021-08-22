const initialState = {
    item: null,
    items: {},
    loading: true,
    image:{},
    allItemsLoading: true,
    itemPosted: false,
    allItems: {},
    allPosts: {},
    currentItemLoading:true,
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
                allItemsLoading: false,
                currentItemLoading:true,
            }
        }
        case "GET_ALL_POSTS":{
            return {
                ...state,
                allPosts: action.payload,
            }
        }
        case "GET_SINGLE_ITEM":{
            return {
                ...state,
                currentItem: action.payload,
                currentItemLoading:false
            }
        }
        case "CREATE":
            return {
                ...state,
                item: action.payload
            }
        case "ITEM_IMAGE_UPLOADED":
            return {
                ...state,
                image: action.payload
            }
        case "DELETE":{
            return{
                ...state,
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
                rentedItem: action.payload,
                rentedItemsLoading:true,
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
        case "VERIFY_RENTED_ITEM":{
            return {
                ...state
            }
        }
        case "FINISH_RENTING":{
            return {
                ...state
            }
        }
        default:
            return state
    }
}

export default reducer;