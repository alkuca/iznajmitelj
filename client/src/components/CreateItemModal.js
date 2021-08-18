import React, { useState } from "react";
import InputModal from "./InputModal";
import InputField from "./InputField";
import InputTextarea from "./InputTextarea";
import emptyImage from "../images/icons/empty_picture.png";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";

const CreateItemModal = props => {
    const [mainImage, setMainImage] = useState(null)
    const [step, setStep] = useState(1)

    const currentUser = useSelector((state) => state.userState.currentUser)

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        item_state: currentUser.user_state,
        item_street: currentUser.user_street,
        item_street_number: currentUser.user_street_number,
        item_city: currentUser.user_city,
        item_lat: currentUser.lat,
        item_long: currentUser.long
    });


    const { createItem, deleteItem, getUserItems } = bindActionCreators(itemActions, useDispatch())

    const handleClick = e => setMainImage(URL.createObjectURL(e.target.files[0]))

    const onFormChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    });

    const createItemAction = async () => {
        if(formData.name.length && formData.price.length){
            await createItem(formData)
            getUserItems();
            props.closeModal();
            console.log(formData)
        }else{
            alert("nedostaju podaci")
        }
    }

    const moveStep = () => {
        setStep(step + 1)
    }

    return (
        <InputModal>
            <div className="add-item-modal-container">
                {step === 1 &&
                <div className="data-input-container">
                    <InputField required={"required"} className="input-container" type="text" label="Naziv proizvoda"
                                name="name" onChange={e => onFormChange(e)}/>
                    <InputField required={"required"} className="input-container number-input" type="number"
                                label="Cijena (kn/24h)" min={1} name="price" onChange={e => onFormChange(e)}/>
                    <InputTextarea required={"required"} rows={4} className="textarea-container" label="Opis"
                                   name="description" onChange={e => onFormChange(e)}/>
                </div>
                }
                {step === 2 &&
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
                }
            </div>
            <div className="button-container">
                {step !== 2 ?
                    <button onClick={moveStep} className="confirm">Dalje</button>
                    :
                    <button onClick={createItemAction} className="confirm">Dodaj</button>
                }
                <button onClick={props.closeModal} className="cancel">Odustani</button>
            </div>
        </InputModal>
    );
}

export default CreateItemModal;

