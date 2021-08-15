import React from "react";

function DeliveryTypeCard (props) {

    return (
        <div onClick={props.moveStep} className="delivery-card">
            <i className={props.icon}/>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            {props.paymentImage &&
            <div className="payment-types">
                <img src={props.paymentTypeImage} alt="payment"/>
            </div>
            }
        </div>
    )
}

export default DeliveryTypeCard;

