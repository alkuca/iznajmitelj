import React from "react";
import loader from "../../images/Loader.svg";

const Loader = props => {
    return (
        <div className={props.className}>
            <img className="loader" src={loader} alt="loader"/>
        </div>
    )
}

export default Loader;

