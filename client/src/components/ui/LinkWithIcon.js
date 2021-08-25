import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import classnames from "classnames";
import {bindActionCreators} from "redux";
import {uiActions} from "../../state";
import {useDispatch, useSelector} from "react-redux";

const LinkWithIcon = props => {
    const {toggleSidebar} = bindActionCreators(uiActions, useDispatch())
    const uiState = useSelector((state) => state.uiState)

    return (
        <Link to={props.goTo}>
            <div className={classnames("link-with-icon", {
                "active-link": props.location.pathname === props.goTo
            })} onClick={uiState.sidebarToggle ? toggleSidebar : null}>
                <i className={`fi-br-${props.icon}`}/>
                <p>{props.text}</p>
            </div>
        </Link>
    )
}

export default withRouter(LinkWithIcon);

