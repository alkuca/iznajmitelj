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

export const editProfile = formData => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            "http://localhost:5000/profile/editProfile",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "token": token
                },
                body: JSON.stringify(formData)
            }
        );
        const parseRes = await res.json()
        if(res){
            dispatch({
                type: "EDIT_PROFILE",
                payload: parseRes
            })
            return(parseRes)
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const changeAvatar = data => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            "http://localhost:5000/profile/changeAvatar",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "token": token
                },
                body: JSON.stringify({ data: data })
            }
        );
        const parseRes = await res.json()
        if(res){
            dispatch({
                type: "CHANGE_AVATAR",
                payload: parseRes
            })
            return true
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const clearSingleUser = () => dispatch => {
    dispatch({
        type: "CLEAR_SINGLE_USER"
    })
}