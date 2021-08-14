export const getAllItems = () => async dispatch => {
    try {
        const res = await fetch(
            "http://localhost:5000/items/getAllItems",
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            }
        );
        const parseRes = await res.json()
        if(res.ok){
            dispatch({
                type: "GET_ALL_ITEMS",
                payload: parseRes
            })
            return(parseRes)
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const getSingeItem = item_id => async dispatch => {
    try {
        const res = await fetch(
            `http://localhost:5000/items/getSingleItem/${item_id}`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            }
        );
        const parseRes = await res.json()
        if(res.ok){
            dispatch({
                type: "GET_SINGLE_ITEM",
                payload: parseRes
            })
            return(parseRes)
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const createItem = item => async dispatch => {
    const token = localStorage.getItem("token");
    try {
         const response = await fetch(
            "http://localhost:5000/items/createItem",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "token": token
                },
                body: JSON.stringify(item)
            }
        );
         if(response.ok){
             dispatch({
                 type: "CREATE",
                 payload: item
             })
         }
    } catch (err) {
        console.error(err.message);
    }
}

export const deleteItem = (item) => {
    return (dispatch) => {
        dispatch({
            type: "DELETE",
            payload: item
        })
    }
}

export const getUserItems = () => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            "http://localhost:5000/items/getUserItems",
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "token": token
                }
            }
        );
        const parseRes = await res.json()
        if(res.ok){
            dispatch({
                type: "GET_USER_ITEMS",
                payload: parseRes
            })
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const postItem = id => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            `http://localhost:5000/items/postItem/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "token": token
                }
            }
        );
        if(res){
            dispatch({
                type: "POST_ITEM"
            })
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const deletePost = id => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            `http://localhost:5000/items/removePost/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "token": token
                }
            }
        );
        const parseRes = await res.json()
        if(parseRes){
            dispatch({
                type: "REMOVE_POST"
            })
        }
    } catch (err) {
        console.error(err.message);
    }
}