import React from "react";
import LinkWithIcon from "./LinkWithIcon";
import classnames from "classnames";

function NavbarDropdown (props) {
    const dropdown = props.dropdown
    return (
        <div className={classnames("navbar-dropdown", {
            "t": dropdown
        })}>
            <LinkWithIcon text="Profil" icon="user"/>
            <LinkWithIcon text="Poruke" icon="comment-alt"/>
            <LinkWithIcon text="Postavke" icon="settings-sliders"/>
            <div className="links-line"/>
            <LinkWithIcon text="Pomoć" icon="info"/>
            <LinkWithIcon text="Odjavi se" icon="power"/>
        </div>
    )
}

export default NavbarDropdown;