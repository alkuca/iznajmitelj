import React from "react";
import item from "../images/drone.png";
import PriceWithTime from "./PriceWithTime";
import LocationWithIcon from "./LocationWithIcon";

class ItemCard extends React.Component {
    render(){
        return (
            <div className="item-card-container">
                <div className="image-container">
                    <img src={item} alt="Drone"/>
                </div>
                <div className="data-container">
                    <h1>Oculus Rift 2020 sa controlerima</h1>
                    <LocationWithIcon/>
                    <PriceWithTime/>
                </div>
            </div>
        )
    }
}

export default ItemCard;

