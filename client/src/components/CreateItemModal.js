import React, { useState } from "react";
import InputModal from "./InputModal";
import InputField from "./InputField";
import InputTextarea from "./InputTextarea";
import emptyImage from "../images/icons/empty_picture.png";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";

function CreateItemModal (props)  {
    const [mainImage, setMainImage] = useState(null)


    const currentUserState = useSelector((state) => state.userState.currentUser.user_state)

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        user_state: currentUserState
    });


    const { createItem, deleteItem } = bindActionCreators(itemActions, useDispatch())

    const handleClick = e => setMainImage(URL.createObjectURL(e.target.files[0]))

    const onFormChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    });

    const createItemAction = () => {
        createItem(formData)
    }

    return (
        <InputModal>
            <div className="add-item-modal-container">
                <div className="data-input-container">
                    <InputField className="input-container" type="text" label="Naziv proizvoda" name="name" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container number-input" type="number" label="Cijena (kn/24h)" name="price" onChange={e => onFormChange(e)}/>
                    <InputTextarea rows={4} className="textarea-container" label="Opis" name="description" onChange={e => onFormChange(e)}/>
                </div>
                <div className="image-input-container">
                    <div className="main-image-container">
                        { mainImage ?
                            <img src={mainImage} alt="item"/> :
                            <img src={emptyImage} alt="placeholder"/>}
                        <label className="custom-file-upload">
                            <input type="file" onChange={handleClick}/>
                            Odaberi sliku
                        </label>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button onClick={createItemAction} className="confirm">Dodaj</button>
                <button onClick={props.closeModal} className="cancel">Odustani</button>
            </div>
        </InputModal>
    );
}

export default CreateItemModal;

