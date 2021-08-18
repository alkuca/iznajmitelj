import React from "react";
import loader from "../images/Loader.svg";

const Loader = () => {
    return (
        <div className="loader-container">
            <img className="loader" src={loader} alt="loader"/>
        </div>
    )
}

export default Loader;

