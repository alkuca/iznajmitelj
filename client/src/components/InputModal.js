import React from "react";

function InputModal (props) {

    return (
        <div className="input-modal-container">
            <div className="input-modal">
                {props.children}
            </div>
        </div>
    )
}

export default InputModal;

