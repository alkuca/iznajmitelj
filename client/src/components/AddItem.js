import React, { useState } from "react";
import InputModal from "./InputModal";
import InputField from "./InputField";
import InputTextarea from "./InputTextarea";
import emptyImage from "../images/icons/empty_picture.png";



function AddItem (props)  {
    const [mainImage, setMainImage] = useState(null)

    const handleClick = e => setMainImage(URL.createObjectURL(e.target.files[0]))
    return (
        <InputModal>
            <div className="add-item-modal-container">
                <div className="data-input-container">
                    <InputField className="input-container" type="text" label="Naziv" name="name"/>
                    <InputField className="input-container" type="text" label="Lokacija" name="name"/>
                    <InputField className="input-container number-input" type="number" label="Cijena (kn/24h)" name="name"/>
                    <InputTextarea id="opis" name="opis" rows={4} className="textarea-container" label="Opis"/>
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
                <button className="confirm">Dodaj</button>
                <button onClick={props.closeModal} className="cancel">Odustani</button>
            </div>
        </InputModal>
    );
}

export default AddItem;

