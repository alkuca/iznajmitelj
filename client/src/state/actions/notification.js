export const getUserNotifications = () => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            "http://localhost:5000/notifications/getUserNotifications",
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
                type: "GET_USER_NOTIFICATIONS",
                payload: parseRes
            })
            return parseRes
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const clearUserNotifications = () => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            "http://localhost:5000/notifications/clearUserNotifications",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "token": token
                }
            }
        );
        const parseRes = await res.json()
        if(res.ok){
            dispatch({
                type: "CLEAR_USER_NOTIFICATIONS",
                payload: parseRes
            })
            return true
        }
    } catch (err) {
        console.error(err.message);
    }
}