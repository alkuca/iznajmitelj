import React from "react";
import InputModal from "./InputModal";
import InputField from "./InputField";
import InputTextarea from "./InputTextarea";

function NewMessageModal (props) {

    return (
        <InputModal>
            <div className="new-message-modal-container">
                <InputField className="input-container" type="text" label="Naslov" name="name"/>
                <InputTextarea id="opis" name="opis" rows={4} className="textarea-container" label="Poruka"/>
            </div>
            <div className="button-container">
                <button onClick={props.sendMessage} className="confirm">Pošalji</button>
                <button onClick={props.closeModal} className="cancel">Odustani</button>
            </div>
        </InputModal>
    )
}

export default NewMessageModal;

