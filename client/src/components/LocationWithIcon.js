import React from "react";

const LocationWithIcon = (props) => {

    return (
        <div className="location-container">
            <i className="fi-br-marker"/>
            <p>{props.state}</p>
        </div>
    )
}

export default LocationWithIcon;

