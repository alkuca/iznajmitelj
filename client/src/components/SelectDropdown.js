import React, {useEffect, useRef, useState} from 'react';

function SelectDropdown () {
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
        <div className="select-dropdown-container">
            <div className="dropdown-select" ref={ref2} onClick={handleToggleClick}>
                <p className="select-label">Poredaj prema:</p>
                <div className="select-container">
                    <div className="select-title">
                        <p>Sve</p>
                        <i className="fi-br-angle-small-down"/>
                    </div>
                    {dropdown &&
                    <div ref={ref} className="select-dropdown">
                        <p>Popularno</p>
                        <p>Novo</p>
                        <p>Cijena</p>
                        <p>Udaljenosti</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectDropdown;

