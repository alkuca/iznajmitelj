import React, { useState } from "react";
import InputModal from "../../layout/InputModal";
import InputField from "../InputField";
import InputTextarea from "../InputTextarea";
import emptyImage from "../../../images/empty_picture.png";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../../../state";
import LoaderWhite from "../LoaderWhite";

const CreateItemModal = props => {
    const [itemCreationLoading, setItemCreationLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState()
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
        item_long: currentUser.long,
        item_image: ""
    });


    const { createItem, getUserItems,uploadItemImage } = bindActionCreators(itemActions, useDispatch())

    const handleClick = e => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setSelectedFile(e.target.files[0])
    }

    const onFormChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value
    });

    const addImageToForm = async item_image => {
        const fullForm = {
            ...formData
        }
        if(item_image){
            fullForm.item_image = item_image;
        }
        return fullForm
    }

    const createItemAction = async () => {
        setItemCreationLoading(true)
        const reader = new FileReader();
        if(selectedFile){
            reader.readAsDataURL(selectedFile);
        }
        if(formData.name.length && formData.price.length){
            reader.onloadend = async () => {
                await uploadItemImage(reader.result).then( r => {
                    if(r.url){
                        addImageToForm(r.url).then(r => {
                            createItem(r).then(r => {
                                    if(r){
                                        getUserItems()
                                        setItemCreationLoading(false)
                                        props.closeModal()
                                    }
                                }
                            )
                        })
                    }else{
                        alert("pokusaj ponovno")
                        setItemCreationLoading(false)
                    }
                })
            };
        }else{
            alert("nedostaju podaci")
            setItemCreationLoading(false)
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
                        { previewImage ?
                            <img src={previewImage} alt="item"/> :
                            <img src={emptyImage} alt="placeholder"/>}
                        <label className="custom-file-upload">
                            <input type="file" name="image"  onChange={handleClick}/>
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
                    <button onClick={createItemAction} className="confirm">{itemCreationLoading ? <LoaderWhite/> : "Dodaj"}</button>
                }
                <button onClick={props.closeModal} className="cancel">Odustani</button>
            </div>
        </InputModal>
    );
}

export default CreateItemModal;

