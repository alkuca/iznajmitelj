import React, {useState, useRef, useEffect, Fragment} from "react";
import avatar_icon from "../images/icons/avatar.svg"
import NavbarDropdown from "./NavbarDropdown";
import classnames from "classnames";

function Navbar () {
    const [dropdown, toggleDropdown] = useState(false)
    const ref = useRef(null);
    const ref2 = useRef(null)

    const handleToggleClick = () => {
        toggleDropdown(!dropdown)
    }

    const handleClickOutside = e => {
        if ((ref.current && !ref.current.contains(e.target)) && (ref2.current && !ref2.current.contains(e.target))) {
            toggleDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside,true );
        };
    });

    return (
        <div className="navbar-container">
            <div className="logo-container">
                <p>Rent</p>
            </div>
            <div className="search-container">
                <div className="inner-container">
                    <i className="fi-br-search"/>
                    <input type="text" placeholder="Pretraži..."/>
                </div>
            </div>
            <div className="navbar-menu-container">
                <i className="fi-br-bell bell"/>
                <img className="avatar" src={avatar_icon} alt="Avatar"/>
                <div ref={ref2} className="name-container" onClick={handleToggleClick}>
                    <p>Adam Smith</p>
                    <i className={classnames("fi-br-angle-small-down", {
                        "hide": dropdown
                    })}/>
                </div>
                { dropdown &&
                    <div ref={ref}>
                        <NavbarDropdown dropdown={dropdown}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;