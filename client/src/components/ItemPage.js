import React, {Fragment, useState, useEffect} from "react";
import LocationWithIcon from "./LocationWithIcon";
import item from "../images/drone.png";
import PriceWithTime from "./PriceWithTime";
import RentProcess from "./RentProcess";
import NewMessageModal from "./NewMessageModal";
import MapInfo from "./MapInfo";
import ContactInfo from "./ContactInfo";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";
import {withRouter} from "react-router-dom";

const ItemPage = props => {
    const [rentModal, toggleRentModal] = useState(false)
    const [newMessageModal, toggleNewMessageModal] = useState(false)

    const itemState = useSelector((state) => state.itemsState)
    const userState = useSelector((state) => state.userState)

    const {getSingeItem} = bindActionCreators(itemActions, useDispatch())

    const handleRentModalToggle = () => {
        toggleRentModal(!rentModal)
    }

    const sendMessage = () => {
        console.log("message send")
    }

    const handleNewMessageClick = () => {
        toggleNewMessageModal(!newMessageModal)
    }

    useEffect(() => {
        getSingeItem(props.match.params.item_id)
    }, []);




    return (
        <div>
            {itemState.currentItem[0] &&
            <div className="item-page-container">
                <div className="images-container">
                    <img src={item} alt="Drone"/>
                    {/*
                    <div className="thumbnail-container">
                        <img src={item} alt="Drone thumbnail"/>
                        <img src={item} alt="Drone thumbnail"/>
                        <img src={item} alt="Drone thumbnail"/>
                        <img src={item} alt="Drone thumbnail"/>
                        <div className="upload-image-icon">
                            <i className="fi-br-cloud-upload"/>
                        </div>
                    </div>
                    */}
                </div>
                <div className="data-container">
                    <h1>{itemState.currentItem[0].item_name}</h1>
                    <div className="location-price">
                        <LocationWithIcon item={itemState.currentItem[0]} detailed={true}/>
                        <PriceWithTime price={itemState.currentItem[0].item_price} timeFormat="24h"/>
                    </div>
                    <p className="item-description">{itemState.currentItem[0].item_description}</p>
                    <div className="button-container flex-start">
                        {itemState.currentItem[0].item_owner === userState.currentUser.user_id ?
                            (<Fragment>
                                <button>Uredi</button>
                                <button className="color-red border-red">Ukloni</button>
                            </Fragment>)
                            :
                            (<Fragment>
                                <button onClick={handleRentModalToggle}>Unajmi</button>
                                <button onClick={handleNewMessageClick}>Poruka</button>
                            </Fragment>)
                        }
                    </div>
                </div>
                {/*
                    <div className="details-container">
                        <h1>Dodatan opis</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium
                            risus.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium
                            risus.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium
                            risus.</p>
                    </div>
                */}
                <div className="map-container">
                    <h1>Lokacija</h1>
                    <MapInfo lat={itemState.currentItem[0].item_lat}
                             long={itemState.currentItem[0].item_long}
                             zoom={15}
                             scrollWheelZoom={true}
                    />
                </div>
                <ContactInfo/>
                {rentModal &&
                <RentProcess handleModalToggle={handleRentModalToggle}/>
                }
                {newMessageModal &&
                <NewMessageModal sendMessage={sendMessage} closeModal={handleNewMessageClick}/>
                }
            </div>
            }
        </div>
    )
}

export default withRouter(ItemPage);

