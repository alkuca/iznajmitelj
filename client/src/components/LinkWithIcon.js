import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import classnames from "classnames";

function LinkWithIcon(props) {

    return (
        <Link to={props.goTo}>
            <div className={classnames("link-with-icon", {
                "active-link": props.location.pathname === props.goTo
            })}>
                <i className={`fi-br-${props.icon}`}/>
                <p>{props.text}</p>
            </div>
        </Link>
    )
}

export default withRouter(LinkWithIcon);

