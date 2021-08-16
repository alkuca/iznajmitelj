import React, {Fragment, useEffect, useState} from "react";
import item from "../images/drone.png";
import PriceWithTime from "./PriceWithTime";
import LocationWithIcon from "./LocationWithIcon";
import SettingsDropdown from "./SettingsDropdown";
import ConfirmationModal from "./ConfirmationModal";
import ItemCodeEnter from "./ItemCodeEnter";
import SettingDropdownButton from "./SettingDropdownButton";
import {Link, withRouter} from 'react-router-dom';
import ReturnProcess from "./ReturnProcess";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";
import {useDispatch, useSelector} from "react-redux";

const ItemCard = props => {

    const [postConfirmation, togglePostConfirmation] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)
    const [codeEnterModal, toggleCodeEnterModal] = useState(false)
    const [returnProcessModal, toggleReturnProcessModal] = useState(false)
    const [rentedStatus, setRentedStatus] = useState(false)


    const waitingCode = true;
    const waitingReturn = false;

    const itemState = useSelector((state) => state.itemsState)

    const deleteNote = "Jeste li sigurni da želite trajno izbrisat odabrani proizvod?"
    const postNote = "Klikom na Objavi proizvod postaje vidljiv ostalim korisnicima."

    const { postItem, deletePost, getUserItems } = bindActionCreators(itemActions, useDispatch())

    const handlePostClick = () => {
        togglePostConfirmation(!postConfirmation)
        console.log("post click")
    }

    const handleCodeEnterClick = () => {
        toggleCodeEnterModal(!codeEnterModal)
    }

    const handleReturnClick = () => {
        toggleReturnProcessModal(!returnProcessModal)
    }

    const handleDeleteClick = () => {
        toggleDeleteConfirmation(!deleteConfirmation)
        console.log("delete click")
    }

    const postItemAction = async () => {
        await postItem(props.item_id);
        getUserItems()
        handlePostClick();
    }

    const deletePostAction = async () => {
        await deletePost(props.item_id);
        getUserItems()
        handleDeleteClick();
    }

    const deleteItem = () => {
        console.log("item deleted")
    }


    useEffect( ()  => {
        const res = itemState.rentedOutItems.filter(item => item.item_name === "xxx")
        if(res){
            setRentedStatus(true)
        }else{
            setRentedStatus(false)
        }
    }, []);

    return (
        <div className="item-card-container">
            <Link to={`/dashboard/stvar/${props.item_id}`}>
                <div className="image-container">
                    <img src={item} alt="Drone"/>
                    {window.location.pathname === "/dashboard/unajmljeno" &&
                    <div className="image-overlay">
                        {props.codeEntered ?
                            <Fragment>
                                <p>Preostalo vremena:</p>
                                <p>20 sati</p>
                            </Fragment>
                            :
                            <i className="fi-rr-lock"/>
                        }
                    </div>
                    }
                    {window.location.pathname === "/dashboard/iznajmljeno" &&
                    <div className="image-overlay">
                        {props.codeEntered ?
                            <Fragment>
                                <p>Završava:</p>
                                <p>20.03.2021</p>
                            </Fragment>
                        :
                            <p>Cekanje na unos koda od unajmitelja</p>
                        }
                    </div>
                    }
                </div>
            </Link>
                <div className="data-container">
                    {(rentedStatus && window.location.pathname === "/dashboard/stvari") &&
                    <p className="card-status">IZNAJMLJENO</p>
                    }
                    <h1>{props.name}</h1>
                    <Fragment>
                        {props.showLocation &&
                            <LocationWithIcon state={props.state} detailed={false}/>
                        }
                        {props.showPricePerDay &&
                            <PriceWithTime price={props.price} timeFormat="24h"/>
                        }
                        {props.showTotalPrice &&
                            <p>{props.totalPrice}</p>
                        }
                        {(!props.codeEntered && props.code) &&
                            <p className="item-code">{props.code}</p>
                        }
                        {(props.codeEntered && window.location.pathname === "/dashboard/iznajmljeno") &&
                            <p className="item-code">Kod unesen</p>
                        }
                        {props.renterName &&
                            <Fragment>
                                <p>Unajmljeno na {props.duration} dana za {props.fullPrice} Kn</p>
                                <div className="same-row card-renter">
                                    <p>Unajmitelj:</p>
                                    <p>{props.renterName}</p>
                                </div>
                            </Fragment>
                        }
                        {props.owner_name &&
                        <Fragment>
                            <div className="same-row card-renter">
                                <p>Vlasnik:</p>
                                <p>{props.owner_name}</p>
                            </div>
                        </Fragment>
                        }
                    </Fragment>
                    {(!props.codeEntered && window.location.pathname === "/dashboard/unajmljeno") &&
                        <button onClick={handleCodeEnterClick} className="enter-code-button">Unesi kod</button>
                    }
                    {(props.codeEntered && window.location.pathname === "/dashboard/unajmljeno") &&
                        <button onClick={handleReturnClick} className="enter-code-button">Vrati</button>
                    }
                </div>

            {/* card dropdown shows only on dashboard/stvari and dashboard/objave */}

            {window.location.pathname === "/dashboard/stvari" &&
            <SettingsDropdown>
                {props.item_posted || rentedStatus ?
                    <Fragment>
                        <SettingDropdownButton className="dropdown-item button-disabled" buttonText="Objavi"
                                               icon="document"/>
                        <SettingDropdownButton className="dropdown-item red-font button-disabled" buttonText="Ukloni" icon="bell red-font"/>
                    </Fragment>
                    :
                    <Fragment>
                        <SettingDropdownButton className="dropdown-item" buttonAction={handlePostClick} buttonText="Objavi"
                                               icon="document"/>
                        <SettingDropdownButton className="dropdown-item red-font" buttonAction={handleDeleteClick}
                                               buttonText="Ukloni" icon="bell red-font"/>
                    </Fragment>
                }
            </SettingsDropdown>
            }
            {window.location.pathname === "/dashboard/objave" &&
            <SettingsDropdown>
                <SettingDropdownButton className="dropdown-item red-font" buttonAction={handleDeleteClick}
                                       buttonText="Ukloni Objavu" icon="eye-crossed red-font"/>
            </SettingsDropdown>
            }

            {/* confirmation modals */}

            {postConfirmation &&
            <ConfirmationModal note={postNote} icon="fi-br-file-add color-blue" actionName="Objavi" buttonText="Objavi"
                               type="positive" confirmAction={postItemAction} closeModal={handlePostClick}/>
            }
            {(deleteConfirmation && window.location.pathname === "/dashboard/stvari") &&
            <ConfirmationModal note={deleteNote} icon="fi-br-trash color-red" actionName="Ukloni Stvar"
                               buttonText="Ukloni" type="negative" confirmAction={deleteItem}
                               closeModal={handleDeleteClick}/>
            }
            {(deleteConfirmation && window.location.pathname === "/dashboard/objave") &&
            <ConfirmationModal note={deleteNote} icon="fi-br-trash color-red" actionName="Ukloni Objavu"
                               buttonText="Ukloni" type="negative" confirmAction={deletePostAction}
                               closeModal={handleDeleteClick}/>
            }
            {codeEnterModal &&
            <ItemCodeEnter
                closeModal={handleCodeEnterClick}
                item_name={props.name}
                duration={props.duration}
                rented_item_id={props.rented_item_id}
            />
            }
            {returnProcessModal &&
            <ReturnProcess handleModalToggle={handleReturnClick}/>
            }
        </div>
    )
}

export default withRouter(ItemCard);

