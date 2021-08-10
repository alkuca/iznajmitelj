const initialState = {
    item:{}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "create":
            return {
                item: action.payload
            }
        case "delete":{
            return{
                item: action.payload
            }
        }
        default:
            return state
    }
}

export default reducer;