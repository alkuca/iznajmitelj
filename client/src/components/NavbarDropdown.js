import React from "react";
import LinkWithIcon from "./LinkWithIcon";
import classnames from "classnames";

function NavbarDropdown (props) {
    const dropdown = props.dropdown

    return (
        <div className={classnames("navbar-dropdown", {
            "t": dropdown
        })}>
            <LinkWithIcon text="Profil" icon="user" goTo="/dashboard/profil"/>
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