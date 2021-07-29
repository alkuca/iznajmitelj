import React from "react";
import LinkWithIcon from "./LinkWithIcon";


function NavbarDropdown () {
    return (
        <div className="navbar-dropdown">
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