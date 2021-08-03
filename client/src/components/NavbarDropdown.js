import React from "react";
import LinkWithIcon from "./LinkWithIcon";
import classnames from "classnames";

function NavbarDropdown (props) {
    const dropdown = props.dropdown

    const logout = () => {
        console.log("logout")
    }
    return (
        <div className={classnames("navbar-dropdown", {
            "t": dropdown
        })}>
            <LinkWithIcon text="Profil" icon="user" location="/dashboard/profil"/>
            <LinkWithIcon text="Poruke" icon="comment-alt" location="/dashboard/poruke"/>
            <LinkWithIcon text="Postavke" icon="settings-sliders" location="/dashboard/postavke"/>
            <div className="links-line"/>
            <LinkWithIcon text="Pomoć" icon="info" location="/faq"/>
            <div onClick={logout}>
                <LinkWithIcon text="Odjavi se" icon="power" location="/login" />
            </div>
        </div>
    )
}

export default NavbarDropdown;