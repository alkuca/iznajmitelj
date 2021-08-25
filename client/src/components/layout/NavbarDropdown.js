import React from "react";
import LinkWithIcon from "../ui/LinkWithIcon";
import classnames from "classnames";
import {useSelector} from "react-redux";

const NavbarDropdown = props => {

    const userState = useSelector((state) => state.userState.currentUser)

    return (
        <div className={classnames("navbar-dropdown", {
            "t": props.dropdown
        })}>
            <LinkWithIcon text="Profil" icon="user" goTo={`/dashboard/profil/${userState.user_id}`}/>
            <LinkWithIcon text="Poruke" icon="comment-alt" goTo="/dashboard/poruke"/>
            <LinkWithIcon text="Obavijesti" icon="bell" goTo="/dashboard/obavijesti"/>
            <div className="links-line"/>
            <div onClick={props.logout}>
                <LinkWithIcon text="Odjavi se" icon="power" goTo="/auth/login" />
            </div>
        </div>
    )
}

export default NavbarDropdown;