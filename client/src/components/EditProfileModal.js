import React from 'react';
import InputModal from "./InputModal";
import InputField from "./InputField";

const EditProfileModal = (props) => {
    return (
        <div>
            <InputModal>
                <div className="edit-profile-info-container">
                    <InputField className="input-container" type="text" label="Email" name="name"/>
                    <InputField className="input-container" type="text" label="Ime i Prezime" name="name"/>
                    <InputField className="input-container" type="text" label="Ulica" name="name"/>
                    <InputField className="input-container" type="text" label="Broj" name="name"/>
                    <InputField className="input-container" type="text" label="Grad" name="name"/>
                    <InputField className="input-container" type="text" label="Županija" name="name"/>
                </div>
                <div className="button-container">
                    <button onClick={props.editInfo} className="confirm">Spremi</button>
                    <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                </div>
            </InputModal>
        </div>
    );
};

export default EditProfileModal;