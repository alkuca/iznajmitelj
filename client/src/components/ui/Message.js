import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";
import {useSelector} from "react-redux";

const Message = (props) => {

    const userState = useSelector((state) => state.userState)

    return (
        <Link to={`/dashboard/poruka/${props.message_id}`}>
            <div className={classnames("message", {
                "not-read": !props.read && (props.sender_id !== userState.currentUser.user_id)
            })}>
                <div className="user-container">
                    <i className="fi-rr-comment-alt"/>
                    <p>{props.title}</p>
                </div>
            </div>
        </Link>
    )
}

export default Message;

