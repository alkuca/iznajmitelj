import React, {Fragment, useState} from "react";
import LocationWithIcon from "./LocationWithIcon";
import item from "../images/drone.png";
import PriceWithTime from "./PriceWithTime";

function ItemPage() {
    const [isAdmin, toggleIsAdmin] = useState(false)

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
                <p className="item-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
                    suscipit arcu, at pretium risus.
                    Nunc faucibus tempus quam sit amet auctor.
                    Mauris ac maximus nunc. Suspendisse sit amet velit metus. Vestibulum neque risus,
                </p>
                <div className="button-container">
                    {isAdmin ?
                        (<Fragment>
                            <button>Uredi</button>
                            <button className="color-red border-red">Ukloni</button>
                        </Fragment>)
                        :
                        (<Fragment>
                            <button>Unajmi</button>
                            <button>Poruka</button>
                        </Fragment>)
                    }
                </div>
            </div>
            <div className="details-container">
                <h1>Dodatan opis</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium
                    risus.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium
                    risus.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium
                    risus.</p>
            </div>
            <div className="map-container">
                map
            </div>
            <div className="contact-container">
                contact
            </div>
        </div>
    )
}

export default ItemPage;

