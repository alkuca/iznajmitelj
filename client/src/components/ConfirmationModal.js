import React from "react";
import classnames from "classnames";


function ConfirmationModal (props) {
    return (
        <div className="confirm-modal-container">
            <div className="confirm-modal">
                <i className={props.icon}/>
                <p className="action">{props.actionName}</p>
                <h1 className="item">{props.relatedItem}</h1>
                <p>{props.note}</p>
                <div className="button-container">
                    <button className={classnames("confirm", {
                        "background-blue" : props.type === "positive",
                        "background-red" : props.type === "negative"
                    })} onClick={props.confirmAction}>{props.buttonText}</button>
                    <button className="cancel" onClick={props.closeModal}>Odustani</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;

