import React, {useEffect, useRef, useState} from 'react';

function SelectDropdown (props) {
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
                <p className="select-label">{props.type}</p>
                <div className="select-container">
                    <div className="select-title">
                        <p>{props.active}</p>
                        <i className="fi-br-angle-small-down"/>
                    </div>
                    {dropdown &&
                    <div ref={ref} className="select-dropdown">
                        {props.selectItems.map(selectItem =>{
                            return <p onClick={event => props.onClick(event)} key={selectItem}>{selectItem}</p>
                        })}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectDropdown;

