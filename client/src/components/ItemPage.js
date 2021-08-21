import React, {Fragment, useState, useEffect} from "react";
import LocationWithIcon from "./LocationWithIcon";
import PriceWithTime from "./PriceWithTime";
import RentProcess from "./RentProcess";
import NewMessageModal from "./NewMessageModal";
import MapInfo from "./MapInfo";
import ContactInfo from "./ContactInfo";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions, userActions} from "../state";
import {useHistory, withRouter} from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

const ItemPage = props => {
    const [rentModal, toggleRentModal] = useState(false)
    const [newMessageModal, toggleNewMessageModal] = useState(false)
    const [isBeingRented, setIsBeingRented] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)

    const itemState = useSelector((state) => state.itemsState)
    const userState = useSelector((state) => state.userState)

    const deleteNote = "Jeste li sigurni da želite trajno izbrisat odabrani proizvod?"

    const {getSingeItem, getRentedOutItems ,deleteItem} = bindActionCreators(itemActions, useDispatch())
    const {getSingleUser} = bindActionCreators(userActions, useDispatch())

    const history = useHistory();

    const handleRentModalToggle = () => {
        toggleRentModal(!rentModal)
    }

    const handleDeleteClick = () => {
        toggleDeleteConfirmation(!deleteConfirmation)
    }

    const handleNewMessageClick = () => {
        toggleNewMessageModal(!newMessageModal)
    }

    const deleteItemAction = () => {
        deleteItem(itemState.currentItem[0].item_id)
        history.push("/dashboard/stvari")
    }

    useEffect(() => {
        getSingeItem(props.match.params.item_id)
            .then(r => getSingleUser(r[0].item_owner))
    });

    useEffect(()  => {
        getRentedOutItems();
    }, []);

    useEffect( ()  => {
        if(!itemState.rentedOutItemsLoading && !itemState.currentItemLoading){
            const arr1 = itemState.rentedOutItems.filter(item => item.renting_status )
            const filtered = arr1.some((item) => item.item_id === itemState.currentItem[0].item_id );
            if(filtered){
                setIsBeingRented(true)
            }
        }
    }, [itemState.rentedOutItemsLoading,itemState.currentItemLoading]);


    return (
        <div>
            {itemState.currentItem[0] &&
            <div className="item-page-container">
                <div className="images-container">
                    <img src={itemState.currentItem[0].item_image} alt="item"/>
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
                        <LocationWithIcon
                            item_city={itemState.currentItem[0].item_city}
                            item_street={itemState.currentItem[0].item_street}
                            item_street_number={itemState.currentItem[0].item_street_number}
                            detailed={true}/>
                        <PriceWithTime price={itemState.currentItem[0].item_price} timeFormat="24h"/>
                    </div>
                    <p className="item-description">{itemState.currentItem[0].item_description}</p>
                    <div className="button-container flex-start">
                        {(itemState.currentItem[0].item_owner === userState.currentUser.user_id && !itemState.currentItem[0].item_posted && !isBeingRented) &&
                        <button onClick={handleDeleteClick} className="color-red border-red">Ukloni</button>
                        }
                        <Fragment>
                            {itemState.currentItem[0].item_posted && (itemState.currentItem[0].item_owner !== userState.currentUser.user_id) &&
                            <button onClick={handleRentModalToggle}>Unajmi</button>
                            }
                            {itemState.currentItem[0].item_owner !== userState.currentUser.user_id &&
                            <button className="icon-button" onClick={handleNewMessageClick}><i className="fi-br-comment-alt"/></button>
                            }
                        </Fragment>
                    </div>
                </div>
                <div className="map-container">
                    <h1>Lokacija</h1>
                    <MapInfo lat={itemState.currentItem[0].item_lat}
                             long={itemState.currentItem[0].item_long}
                             zoom={15}
                             scrollWheelZoom={true}
                    />
                </div>
                { userState.singleUser[0] &&
                    <ContactInfo
                        email={userState.singleUser[0].user_email}
                        name={userState.singleUser[0].user_name}
                        user_id={userState.singleUser[0].user_id}
                        city={userState.singleUser[0].user_city}
                        street={userState.singleUser[0].user_street}
                        street_number={userState.singleUser[0].user_street_number}
                        user_image={userState.singleUser[0].user_image}

                    />
                }
                {rentModal &&
                <RentProcess handleModalToggle={handleRentModalToggle}/>
                }
                {newMessageModal &&
                <NewMessageModal
                    receiver_name={userState.singleUser[0].user_name}
                    receiver_id={userState.singleUser[0].user_id}
                    closeModal={handleNewMessageClick}/>
                }
                {deleteConfirmation &&
                <ConfirmationModal note={deleteNote}
                                   icon="fi-br-trash color-red"
                                   actionName="Ukloni"
                                   buttonText="Ukloni"
                                   type="negative"
                                   relatedItem={itemState.currentItem[0].item_name + " ?"}
                                   confirmAction={deleteItemAction}
                                   closeModal={handleDeleteClick}/>
                }
            </div>
            }
        </div>
    )
}

export default withRouter(ItemPage);

