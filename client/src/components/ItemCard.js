import React, {Fragment, useEffect, useState} from "react";
import item from "../images/LogoF.svg";
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
import {useDispatch} from "react-redux";
import moment from "moment";
import classnames from "classnames";

const ItemCard = props => {

    const [postConfirmation, togglePostConfirmation] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)
    const [codeEnterModal, toggleCodeEnterModal] = useState(false)
    const [returnProcessModal, toggleReturnProcessModal] = useState(false)
    const [timePassed, setTimePassed] = useState(false)

    const deleteNote = "Jeste li sigurni da želite trajno izbrisat odabrani proizvod?"
    const postNote = "Klikom na objavi proizvod postaje vidljiv ostalim korisnicima."

    const { postItem, deletePost, getUserItems, finishRentingByOwner,getRentedOutItems,deleteItem } = bindActionCreators(itemActions, useDispatch())

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
    }

    const deleteItemAction = async () => {
        await deleteItem(props.item_id)
        getUserItems();
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

    const finishRentingByOwnerAction = () => {
        finishRentingByOwner(props.item_id)
            .then(r => {
                if(r){
                    getRentedOutItems()
                }
            })
    }

    const start_date  = moment(props.time_rent_started);
    const new_date = moment(start_date);
    const date_rent_ends = new_date.add(props.duration, 'days');

    useEffect(() => {
        if(moment().isAfter(date_rent_ends)){
            setTimePassed(true)
        }else{
            setTimePassed(false)
        }
    }, []);


    return (
        <div className={classnames("item-card-container", {
            "is-renting-glow": window.location.pathname === "/dashboard/unajmljeno" && props.codeEntered && !timePassed
        })}>
            <Link to={`/dashboard/stvar/${props.item_id}`}>
                <div className="image-container">
                    <div className="card-image-container">
                        <img src={props.item_image ? props.item_image : item} alt="item"/>
                    </div>
                    {window.location.pathname === "/dashboard/unajmljeno" &&
                    <div className="image-overlay">
                        {props.codeEntered ?
                            <Fragment>
                                {timePassed ?
                                    <Fragment>
                                        <p>NAJAM ZAVRŠIO</p>
                                        <p>Vrati proizvod</p>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <p>Datum zavšetka najma:</p>
                                        <time>{date_rent_ends.format("DD.MM.YYYY")}</time>
                                    </Fragment>
                                }
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
                                {timePassed ?
                                    <Fragment>
                                        <p>NAJAM ZAVRŠIO</p>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <p>Datum zavšetka najma:</p>
                                        <time>{date_rent_ends.format("DD.MM.YYYY")}</time>
                                    </Fragment>
                                }
                            </Fragment>
                            :
                            <p>Cekanje na unos koda od unajmitelja</p>
                        }
                    </div>
                    }
                </div>
            </Link>
                <div className="data-container">
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
                        {(props.codeEntered && window.location.pathname === "/dashboard/iznajmljeno" && !props.renting_status) &&
                        <p className="item-code">ZAVŠRENO</p>
                        }
                        {props.renterName &&
                            <Fragment>
                                <p>Unajmljeno na {props.duration} dana za {props.fullPrice} Kn</p>
                                <div className="same-row card-renter">
                                    <p>Unajmitelj:</p>
                                    <Link to={`/dashboard/profil/${props.renterId}`}>
                                        {props.renterName}
                                    </Link>
                                </div>
                                {timePassed &&
                                    <button onClick={finishRentingByOwnerAction} className="enter-code-button">Zavrsi</button>
                                }
                            </Fragment>
                        }
                        {props.owner_name &&
                        <Fragment>
                            <div className="same-row card-renter">
                                <p>VLASNIK:</p>
                                <Link to={`/dashboard/profil/${props.owner_id}`}>
                                    {props.owner_name}
                                </Link>
                            </div>
                        </Fragment>
                        }
                    </Fragment>
                    {(!props.codeEntered && window.location.pathname === "/dashboard/unajmljeno") &&
                        <button onClick={handleCodeEnterClick} className="enter-code-button">Unesi kod</button>
                    }
                    {(props.codeEntered && window.location.pathname === "/dashboard/unajmljeno") &&
                        <button onClick={handleReturnClick} className="enter-code-button">{timePassed ? "Vrati" : "Vrati Ranije" }</button>
                    }
                </div>

            {/* card dropdown shows only on dashboard/stvari and dashboard/objave */}

            {window.location.pathname === "/dashboard/stvari" &&
            <SettingsDropdown>
                {props.item_posted ?
                    <Fragment>
                        <SettingDropdownButton className="dropdown-item button-disabled" buttonText="Objavi"
                                               icon="eye"/>
                        <SettingDropdownButton className="dropdown-item red-font button-disabled" buttonText="Ukloni" icon="trash red-font"/>
                    </Fragment>
                    :
                    <Fragment>
                        <SettingDropdownButton className="dropdown-item" buttonAction={handlePostClick} buttonText="Objavi"
                                               icon="eye"/>
                        <SettingDropdownButton className="dropdown-item red-font" buttonAction={handleDeleteClick}
                                               buttonText="Ukloni" icon="trash red-font"/>
                    </Fragment>
                }
            </SettingsDropdown>
            }
            {window.location.pathname === "/dashboard/objave" &&
            <SettingsDropdown>
                <SettingDropdownButton className="dropdown-item red-font" buttonAction={handleDeleteClick}
                                       buttonText="Ukloni objavu" icon="eye-crossed red-font"/>
            </SettingsDropdown>
            }

            {/* confirmation modals */}

            {postConfirmation &&
            <ConfirmationModal note={postNote} icon="fi-br-file-add color-blue" actionName="Objavi" buttonText="Objavi"
                               type="positive" confirmAction={postItemAction} closeModal={handlePostClick}/>
            }
            {(deleteConfirmation && window.location.pathname === "/dashboard/stvari") &&
            <ConfirmationModal note={deleteNote}
                               icon="fi-br-trash color-red"
                               actionName="Ukloni"
                               buttonText="Ukloni"
                               type="negative"
                               relatedItem={props.name + " ?"}
                               confirmAction={deleteItemAction}
                               closeModal={handleDeleteClick}
            />
            }
            {(deleteConfirmation && window.location.pathname === "/dashboard/objave") &&
            <ConfirmationModal note={deleteNote} icon="fi-br-trash color-red" actionName="Ukloni objavu"
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
            <ReturnProcess
                handleModalToggle={handleReturnClick}
                rented_item_id={props.rented_item_id}
                owner_id={props.owner_id}
                owner_name={props.owner_name}
                item_id={props.item_id}/>
            }
        </div>
    )
}

export default withRouter(ItemCard);

