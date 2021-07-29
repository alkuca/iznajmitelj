import React, { useState } from "react";
import InputModal from "./InputModal";
import InputField from "./InputField";
import InputTextarea from "./InputTextarea";
import emptyImage from "../images/icons/empty_picture.png";



function AddProduct ()  {
    const [mainImage, setMainImage] = useState(null)

    const handleClick = e => setMainImage(URL.createObjectURL(e.target.files[0]))
    return (
        <InputModal>
            <div className="add-item-modal-container">
                <div className="data-input-container">
                    <InputField className="input-container" type="text" label="Naziv" name="name" onChange="text"/>
                    <InputField className="input-container" type="text" label="Lokacija" name="name"
                                onChange="text"/>
                    <InputField className="input-container number-input" type="number" label="Cijena (kn/24h)"
                                name="name" onChange="text"/>
                    <InputTextarea id="opis" name="opis" rows="6" cols="50" value="" className="textarea-container"
                                   label="Opis"/>
                </div>
                <div className="image-input-container">
                    <div className="main-image-container">
                        { mainImage ?
                            <img src={mainImage}/> :
                            <img src={emptyImage}/>}
                        <label className="custom-file-upload">
                            <input type="file" onChange={handleClick}/>
                            Odaberi sliku
                        </label>
                    </div>
                </div>
            </div>
            <button className="modal-confirm-button">Dodaj</button>
        </InputModal>
    );
}

export default AddProduct;

