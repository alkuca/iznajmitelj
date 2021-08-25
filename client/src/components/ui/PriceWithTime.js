import React from "react";

const PriceWithTime = props => {
    return (
        <div className="price-container">
            <h2>{props.price} kn</h2>
            <p>/{props.timeFormat}</p>
        </div>
    )
}

export default PriceWithTime;

