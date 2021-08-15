export const getUserMessages = () => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            "http://localhost:5000/messages/getUserMessages",
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
                type: "GET_USER_MESSAGES",
                payload: parseRes
            })
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const sendMessage = formData => async dispatch => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(
            "http://localhost:5000/messages/sendMessage",
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
                type: "SEND_MESSAGE",
                payload: parseRes
            })
            return(parseRes)
        }
    } catch (err) {
        console.error(err.message);
    }
}


export const getSingleMessage = message_id => async dispatch => {
    try {
        const res = await fetch(
            `http://localhost:5000/messages/getSingleMessage/${message_id}`,
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
                type: "GET_SINGLE_MESSAGE",
                payload: parseRes
            })
        }
    } catch (err) {
        console.error(err.message);
    }
}