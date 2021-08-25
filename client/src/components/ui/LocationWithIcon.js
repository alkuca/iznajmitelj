import React, {Fragment} from "react";

const LocationWithIcon = (props) => {

    return (
            <Fragment>
            {props.detailed ?
                <div className="location-container">
                    <i className="fi-br-marker"/>
                    <p>{props.item_city + " " + props.item_street + " " + props.item_street_number}</p>
                </div>
                :
                <div className="location-container">
                    <i className="fi-br-marker"/>
                    <p>{props.state}</p>
                </div>}
            </Fragment>
    )
}

export default LocationWithIcon;

