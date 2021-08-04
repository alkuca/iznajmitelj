import React, {useEffect, useRef, useState} from 'react';
import classnames from "classnames";
import {Link} from "react-router-dom";

function SettingsDropdown (props) {
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
        <div className="settings-dropdown-container" ref={ref2} onClick={handleToggleClick}>

            <i className={classnames("drop-icon", {
                "fi-br-angle-small-up ": dropdown,
                "fi-br-angle-small-down": !dropdown
            })}/>
            {dropdown &&
            <div ref={ref} className="settings-dropdown">
                <div className="dropdown-item" onClick={props.postConfirmation}>
                    <i className="fi-br-document"/>
                    <p>Objavi</p>
                </div>
                <Link to="/dashboard/item">
                    <div className="dropdown-item">
                        <i className="fi-br-edit"/>
                        <p>Uredi</p>
                    </div>
                </Link>
                <div className="dropdown-item red-font" onClick={props.deleteConfirmation}>
                    <i className="fi-br-bell red-font"/>
                    <p>Ukloni</p>
                </div>
            </div>
            }
        </div>
    )
}

export default SettingsDropdown;

