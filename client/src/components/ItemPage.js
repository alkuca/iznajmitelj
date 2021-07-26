import React from "react";
import LocationWithIcon from "./LocationWithIcon";
import item from "../images/drone.png";
import PriceWithTime from "./PriceWithTime";

class ItemPage extends React.Component {
    render(){
        return (
            <div className="item-page-container">
                <div className="images-container">
                    <img src={item} alt="Drone"/>
                    <div className="thumbnail-container">
                        <img src={item} alt="Drone thumbnail"/>
                        <img src={item} alt="Drone thumbnail"/>
                        <img src={item} alt="Drone thumbnail"/>
                        <img src={item} alt="Drone thumbnail"/>
                        <div className="upload-image-icon">
                            <i className="fi-br-cloud-upload"/>
                        </div>
                    </div>
                </div>
                <div className="data-container">
                    <h1>Oculus Rift 2020 sa controlerima</h1>
                    <div className="location-price">
                        <LocationWithIcon/>
                        <PriceWithTime/>
                    </div>
                    <p className="item-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium risus.
                        Nunc faucibus tempus quam sit amet auctor.
                        Mauris ac maximus nunc. Suspendisse sit amet velit metus. Vestibulum neque risus,
                    </p>
                    <div className="button-container">
                        <button>Unajmi odmah</button>
                        <button>Postavi pitanje</button>
                    </div>
                </div>
                <div className="details-container">
                    details
                </div>
                <div className="map-container">
                    map
                </div>
            </div>
        )
    }
}

export default ItemPage;

