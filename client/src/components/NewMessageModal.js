import React, {useState} from "react";
import InputModal from "./InputModal";
import InputField from "./InputField";
import InputTextarea from "./InputTextarea";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {messageActions} from "../state";
import {Link} from "react-router-dom";

const NewMessageModal = props => {

    const userState = useSelector((state) => state.userState.currentUser)

    const {sendMessage} = bindActionCreators(messageActions, useDispatch())

    const [formData, setFormData] = useState({
        message_title: "",
        message_text: "",
        sender_name: userState.user_name,
        sender_id: userState.user_id,
        receiver_id: props.receiver_id,
        receiver_name: props.receiver_name
    });
    const onFormChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    });

    const sendMessageAction = () => {
        sendMessage(formData)
        props.closeModal()
    }

    return (
        <InputModal>
            <div className="sender-title">
                <p className="weight-500">Prima:</p>
                <Link to="/dashboard/profile">
                    <p>{props.receiver_name}</p>
                </Link>
            </div>
            <div className="new-message-modal-container">
                <InputField className="input-container" type="text" label="Naslov" name="message_title" onChange={e => onFormChange(e)}/>
                <InputTextarea id="opis" name="message_text" rows={4} className="textarea-container" label="Poruka" onChange={e => onFormChange(e)}/>
            </div>
            <div className="button-container">
                <button onClick={sendMessageAction} className="confirm">Pošalji</button>
                <button onClick={props.closeModal} className="cancel">Odustani</button>
            </div>
        </InputModal>
    )
}

export default NewMessageModal;

