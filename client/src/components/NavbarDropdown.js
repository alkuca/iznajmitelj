import React from "react";
import LinkWithIcon from "./LinkWithIcon";
import classnames from "classnames";
import {useSelector} from "react-redux";

const NavbarDropdown = props => {

    const dropdown = props.dropdown;
    const userState = useSelector((state) => state.userState.currentUser)

    return (
        <div className={classnames("navbar-dropdown", {
            "t": dropdown
        })}>
            <LinkWithIcon text="Profil" icon="user" goTo={`/dashboard/profil/${userState.user_id}`}/>
            <LinkWithIcon text="Poruke" icon="comment-alt" goTo="/dashboard/poruke"/>
            <LinkWithIcon text="Postavke" icon="settings-sliders" goTo="/dashboard/postavke"/>
            <div className="links-line"/>
            <LinkWithIcon text="Pomoć" icon="info" goTo="/dashboard/pomoc"/>
            <div onClick={props.logout}>
                <LinkWithIcon text="Odjavi se" icon="power" goTo="/auth/login" />
            </div>
        </div>
    )
}

export default NavbarDropdown;