import React from "react";
import item from "../images/drone.png";

class ItemCard extends React.Component {
    render(){
        return (
            <div className="item-card-container">
                <div className="image-container">
                    <img src={item} alt="Drone"/>
                </div>
                <div className="data-container">
                    <h1>Oculus Rift 2020 sa controlerima</h1>
                    <div className="location-container">
                        <i className="fi-br-marker"/>
                        <p>Slavonski brod</p>
                    </div>
                    <div className="price-container">
                        <h2>$20</h2>
                        <p>/24h</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemCard;

