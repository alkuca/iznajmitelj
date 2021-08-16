export const getCurrentUser = () => async dispatch => {
    try {
        const res = await fetch("http://localhost:5000/dashboard", {
            method: "POST",
            headers: { token: localStorage.token }
        });
           const parseRes = await res.json()
            if(res.ok){
                dispatch({
                    type: "GET_CURRENT_USER",
                    payload: parseRes
                })
            }

    } catch (err) {
        console.error(err.message);
    }
}

export const getSingleUser = user_id => async dispatch => {
    try {
        const res = await fetch(
            `http://localhost:5000/profile/getSingleUser/${user_id}`,
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
                type: "GET_SINGLE_USER",
                payload: parseRes
            })
            return(parseRes)
        }
    } catch (err) {
        console.error(err.message);
    }
}
