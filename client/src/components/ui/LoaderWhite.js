import React from "react";
import loader from "../../images/whiteSmallLoader.svg";

const LoaderWhite = props => {
    return (
        <div className={props.className}>
            <img className="loader loader-white" src={loader} alt="loader"/>
        </div>
    )
}

export default LoaderWhite;

