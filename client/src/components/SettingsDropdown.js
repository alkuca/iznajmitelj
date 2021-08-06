import React, {useEffect, useRef, useState} from 'react';
import classnames from "classnames";

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
                {props.children}
            </div>
            }
        </div>
    )
}

export default SettingsDropdown;

