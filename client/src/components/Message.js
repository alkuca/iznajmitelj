import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";

function Message (props) {

    return (
        <Link to="/dashboard/poruka">
            <div className={classnames("message", {
                "not-read": !props.read
            })}>
                <div className="user-container">
                    <i className="fi-rr-comment-alt"/>
                    <p>John Doe</p>
                </div>
            </div>
        </Link>
    )
}

export default Message;

