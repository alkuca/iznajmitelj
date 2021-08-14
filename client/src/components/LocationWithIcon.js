import React, {Fragment} from "react";

const LocationWithIcon = (props) => {

    const item = props.item;

    return (
            <Fragment>
            {props.detailed ?
                <div className="location-container">
                    <i className="fi-br-marker"/>
                    <p>{item.item_city + " " + item.item_street + " " + item.item_street_number}</p>
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

