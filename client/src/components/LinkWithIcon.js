import React from "react";
import {Link} from "react-router-dom";

function LinkWithIcon(props) {
    return (
        <Link to={props.location}>
            <div className="link-with-icon">
                <i className={`fi-br-${props.icon}`}/>
                <p>{props.text}</p>
            </div>
        </Link>
    )
}

export default LinkWithIcon;

