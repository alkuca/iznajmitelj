import React, {useState} from "react";
import item from "../images/drone.png";
import PriceWithTime from "./PriceWithTime";
import LocationWithIcon from "./LocationWithIcon";
import SettingsDropdown from "./SettingsDropdown";
import ConfirmationModal from "./ConfirmationModal";

function ItemCard () {
    const [postConfirmation, togglePostConfirmation] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)

    const deleteNote = "Jeste li sigurni da želite trajno izbrisat odabrani proizvod?"
    const postNote = "Klikom na Objavi proizvod postaje vidljiv ostalim korisnicima."

    const handlePostClick = () => {
        togglePostConfirmation(!postConfirmation)
        console.log("post click")
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

    const closePostModal = () => {
        togglePostConfirmation(false)
    }

    const closeDeleteModal = () => {
        toggleDeleteConfirmation(false)
    }


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
            <SettingsDropdown deleteConfirmation={handleDeleteClick} postConfirmation={handlePostClick} />
            {postConfirmation &&
                <ConfirmationModal note={postNote} icon="fi-br-file-add color-blue" actionName="Objavi" buttonText="Objavi" type="positive" confirmAction={postItem} closeModal={closePostModal}/>
            }
            {deleteConfirmation &&
                <ConfirmationModal note={deleteNote} icon="fi-br-trash color-red" actionName="Ukloni" buttonText="Ukloni" type="negative" confirmAction={deleteItem} closeModal={closeDeleteModal}/>
            }
        </div>
    )
}

export default ItemCard;

