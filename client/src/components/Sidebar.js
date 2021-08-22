import React from "react";
import LinkWithIcon from "./LinkWithIcon";
import {Link, withRouter} from 'react-router-dom';
import classnames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {uiActions} from "../state";

const Sidebar = () => {
    const uiState = useSelector((state) => state.uiState)
    const {toggleSidebar} = bindActionCreators(uiActions, useDispatch())

    const handleSidebarToggle = () => {
        toggleSidebar()
    }

        return (
            <div className={classnames("sidebar-container", {
                "sidebar-mobile close-sidebar-icon t3": uiState.sidebarToggle
            })}>
                <div className="inner-container">
                    <div className="links-container">
                        <Link to="/dashboard/trazi">
                            <button className={classnames("rent-now-button", {
                                "button-disabled": window.location.pathname === "/dashboard/trazi"
                            })}>Unajmi odmah
                                <i className="fi-br-angle-double-small-right rent-now-icon"/>
                            </button>
                        </Link>
                        <LinkWithIcon text="Moje stvari" icon="box" goTo="/dashboard/stvari"/>
                        <LinkWithIcon text="Moje objave" icon="document" goTo="/dashboard/objave"/>
                        <LinkWithIcon text="Unajmljeno" icon="arrow-small-down" goTo="/dashboard/unajmljeno"/>
                        <LinkWithIcon text="Iznajmljeno" icon="arrow-small-up" goTo="/dashboard/iznajmljeno"/>
                        <LinkWithIcon text="Statistika" icon="stats" goTo="/dashboard/statistika"/>
                        <LinkWithIcon text="Poruke" icon="comment-alt" goTo="/dashboard/poruke"/>
                    </div>
                </div>
                <i className="fi-br-cross-small close-sidebar-icon" onClick={handleSidebarToggle}/>
            </div>
        )
}

export default withRouter(Sidebar);