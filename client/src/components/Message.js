import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";

const Message = (props) => {

    return (
        <Link to={`/dashboard/poruka/${props.message_id}`}>
            <div className={classnames("message", {
                "not-read": !props.read
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

