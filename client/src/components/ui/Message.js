import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {messageActions} from "../../state";

const Message = (props) => {

    const userState = useSelector((state) => state.userState)
    const { markAsUnread,getUserMessages } = bindActionCreators(messageActions, useDispatch())

    const markAsUnreadAction = async () =>{
        await markAsUnread(props.message_id)
        getUserMessages()
    }

    return (

            <div className={classnames("message", {
                "not-read": !props.read && (props.sender_id !== userState.currentUser.user_id)
            })}>
                <Link to={`/dashboard/poruka/${props.message_id}`}>
                    <div className="user-container">
                        <i className="fi-rr-comment-alt"/>
                        <p>{props.title}</p>
                    </div>
                </Link>
                { props.read && (props.sender_id !== userState.currentUser.user_id) &&
                    <button onClick={markAsUnreadAction}>Označi kao nepročitano</button>
                }
                { props.read && (props.sender_id === userState.currentUser.user_id) &&
                    <p className="message-read">Pročitano</p>
                }
                { !props.read && (props.sender_id === userState.currentUser.user_id) &&
                <p className="message-not-read">Nije pročitano</p>
                }
            </div>

    )
}

export default Message;

