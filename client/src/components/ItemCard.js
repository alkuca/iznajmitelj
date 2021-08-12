import React, {Fragment, useState} from "react";
import item from "../images/drone.png";
import PriceWithTime from "./PriceWithTime";
import LocationWithIcon from "./LocationWithIcon";
import SettingsDropdown from "./SettingsDropdown";
import ConfirmationModal from "./ConfirmationModal";
import ItemCodeEnter from "./ItemCodeEnter";
import SettingDropdownButton from "./SettingDropdownButton";
import {withRouter} from 'react-router-dom';
import ReturnProcess from "./ReturnProcess";

function ItemCard(props) {
    const [postConfirmation, togglePostConfirmation] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)
    const [codeEnterModal, toggleCodeEnterModal] = useState(false)
    const [returnProcessModal, toggleReturnProcessModal] = useState(false)

    const waitingCode = false;
    const waitingReturn = true

    const deleteNote = "Jeste li sigurni da želite trajno izbrisat odabrani proizvod?"
    const postNote = "Klikom na Objavi proizvod postaje vidljiv ostalim korisnicima."

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

    const postItem = () => {
        console.log("item posted")
    }

    const deleteItem = () => {
        console.log("item deleted")
    }

    const deletePost = () => {
        console.log("post deleted")
    }

    const submitCode = () => {
        console.log("code submited")
    }

    return (
        <div className="item-card-container">
            <div className="image-container">
                <img src={item} alt="Drone"/>
                {window.location.pathname === "/dashboard/unajmljeno" &&
                <div className="image-overlay">
                    {waitingCode ?
                        <i className="fi-rr-lock"/>
                        :
                        <Fragment>
                            <p>Preostalo vremena:</p>
                            <p>20 sati</p>
                        </Fragment>
                    }
                </div>
                }
                {window.location.pathname === "/dashboard/iznajmljeno" &&
                <div className="image-overlay">
                    <p>Povratak:</p>
                    <p>20.03.2021</p>
                </div>
                }
            </div>
            <div className="data-container">
                <h1>{props.name}</h1>
                <Fragment>
                    <LocationWithIcon state={props.state}/>
                    <PriceWithTime price={props.price} timeFormat="24h"/>
                </Fragment>
                {(waitingCode && window.location.pathname === "/dashboard/unajmljeno") &&
                    <button onClick={handleCodeEnterClick} className="enter-code-button">Unesi kod</button>
                }
                {(waitingReturn && window.location.pathname === "/dashboard/unajmljeno") &&
                    <button onClick={handleReturnClick} className="enter-code-button">Završi</button>
                }
            </div>
            {window.location.pathname === "/dashboard/stvari" &&
            <SettingsDropdown>
                <SettingDropdownButton className="dropdown-item" buttonAction={handlePostClick} buttonText="Objavi"
                                       icon="document"/>
                <SettingDropdownButton className="dropdown-item red-font" buttonAction={handleDeleteClick}
                                       buttonText="Ukloni" icon="bell red-font"/>
            </SettingsDropdown>
            }
            {window.location.pathname === "/dashboard/objave" &&
            <SettingsDropdown>
                <SettingDropdownButton className="dropdown-item red-font" buttonAction={handleDeleteClick}
                                       buttonText="Ukloni Objavu" icon="eye-crossed red-font"/>
            </SettingsDropdown>
            }
            {postConfirmation &&
            <ConfirmationModal note={postNote} icon="fi-br-file-add color-blue" actionName="Objavi" buttonText="Objavi"
                               type="positive" confirmAction={postItem} closeModal={handlePostClick}/>
            }
            {(deleteConfirmation && window.location.pathname === "/dashboard/stvari") &&
            <ConfirmationModal note={deleteNote} icon="fi-br-trash color-red" actionName="Ukloni Stvar"
                               buttonText="Ukloni" type="negative" confirmAction={deleteItem}
                               closeModal={handleDeleteClick}/>
            }
            {(deleteConfirmation && window.location.pathname === "/dashboard/objave") &&
            <ConfirmationModal note={deleteNote} icon="fi-br-trash color-red" actionName="Ukloni Objavu"
                               buttonText="Ukloni" type="negative" confirmAction={deletePost}
                               closeModal={handleDeleteClick}/>
            }
            {codeEnterModal &&
            <ItemCodeEnter confirmAction={submitCode} closeModal={handleCodeEnterClick}/>
            }
            {returnProcessModal &&
            <ReturnProcess handleModalToggle={handleReturnClick}/>
            }
        </div>
    )
}

export default withRouter(ItemCard);

