import React from 'react';

const SettingDropdownButton = (props) => {
    return (
        <div className={props.className} onClick={props.buttonAction}>
            <i className={`fi-br-${props.icon}`}/>
            <p>{props.buttonText}</p>
        </div>
    );
};

export default SettingDropdownButton;