import React, {Fragment, useEffect, useState} from "react";
import NewMessageModal from "./NewMessageModal";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {messageActions} from "../state";
import {Link} from "react-router-dom";

function MessagePage (props) {
    const [messageModal, toggleMessageModal] = useState(false);

    const messageState = useSelector((state) => state.messageState)

    const {getSingleMessage} = bindActionCreators(messageActions, useDispatch())

    const handleModalToggle = () => {
        toggleMessageModal(!messageModal)
    }

    useEffect(() => {
        getSingleMessage(props.match.params.message_id)
    }, []);


    return (
        <div className="message-page-container">
            {!messageState.currentMessageLoading &&
            <Fragment>
                <div className="sender-title">
                    <p className="weight-500">Poruka od</p>
                    <Link to="/dashboard/profile">
                        <p>{messageState.currentMessage[0].sender_name}</p>
                    </Link>
                </div>
                <span>19.03.2021 u 15:42</span>
                <div className="full-line"/>
                <div className="message-content">
                    <h1>{messageState.currentMessage[0].message_title}</h1>
                    <p>{messageState.currentMessage[0].message_text}</p>
                </div>
                <button onClick={handleModalToggle}>Odgovori</button>
                {messageModal &&
                <NewMessageModal receiver_id={messageState.currentMessage[0].sender_id} closeModal={handleModalToggle}/>
                }
            </Fragment>
            }
        </div>
    )
}

export default MessagePage;

