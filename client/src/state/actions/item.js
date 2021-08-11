
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
                 type: "create",
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
            type: "delete",
            payload: item
        })
    }
}