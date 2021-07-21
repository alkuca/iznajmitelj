import React from "react";


class LocationWithIcon extends React.Component {
    render(){
        return (
            <div className="location-container">
                <i className="fi-br-marker"/>
                <p>Slavonski brod</p>
            </div>
        )
    }
}

export default LocationWithIcon;

