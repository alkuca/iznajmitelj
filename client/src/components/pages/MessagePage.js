import React, {Fragment, useEffect, useState} from "react";
import NewMessageModal from "../ui/modals/NewMessageModal";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {messageActions} from "../../state";
import {Link, useHistory} from "react-router-dom";
import Moment from "react-moment";

function MessagePage (props) {
    const [messageModal, toggleMessageModal] = useState(false);

    const history = useHistory();

    const messageState = useSelector((state) => state.messageState)
    const userState = useSelector((state) => state.userState)

    const {getSingleMessage, hideSendMessage, hideReceivedMessage} = bindActionCreators(messageActions, useDispatch())

    const handleModalToggle = () => {
        toggleMessageModal(!messageModal)
    }

    const hideReceivedAction = async () => {
        await hideReceivedMessage(messageState.currentMessage[0].message_id)
        history.push("/dashboard/poruke")
    }

    const hideSendAction = async () => {
        await hideSendMessage(messageState.currentMessage[0].message_id)
        history.push("/dashboard/poruke")
    }

    useEffect(() => {
        getSingleMessage(props.match.params.message_id)
    }, []);

    return (
        <div className="message-page-container">
            {!messageState.currentMessageLoading &&
            <Fragment>
                <div className="sender-title">
                    {messageState.currentMessage[0].sender_id === userState.currentUser.user_id ?
                        <Fragment>
                            <p className="weight-500">Prima:</p>
                            <Link to={`/dashboard/profil/${messageState.currentMessage[0].receiver_id}`}>
                                <p>{messageState.currentMessage[0].receiver_name}</p>
                            </Link>
                        </Fragment>
                        :
                        <Fragment>
                            <p className="weight-500">Poruka od</p>
                            <Link to={`/dashboard/profil/${messageState.currentMessage[0].sender_id}`}>
                                <p>{messageState.currentMessage[0].sender_name}</p>
                            </Link>
                        </Fragment>
                    }
                </div>
                <Moment format="DD.MM.YYYY u HH:mm">
                    {messageState.currentMessage[0].time_created}
                </Moment>
                <div className="full-line"/>
                <div className="message-content">
                    <h1>{messageState.currentMessage[0].message_title}</h1>
                    <p>{messageState.currentMessage[0].message_text}</p>
                </div>
                {messageState.currentMessage[0].sender_id === userState.currentUser.user_id ?
                    <Fragment>
                        <button onClick={handleModalToggle}>Pošalji novu</button>
                        <button onClick={hideSendAction}>Izbriši</button>
                    </Fragment>
                    :
                    <Fragment>
                        <button onClick={handleModalToggle}>Odgovori</button>
                        <button onClick={hideReceivedAction}>Izbriši</button>
                    </Fragment>
                }
                {messageModal && messageState.currentMessage[0].sender_id !== userState.currentUser.user_id &&
                <NewMessageModal
                    receiver_id={messageState.currentMessage[0].sender_id}
                    receiver_name={messageState.currentMessage[0].sender_name}
                    closeModal={handleModalToggle}/>
                }
                {messageModal && messageState.currentMessage[0].sender_id === userState.currentUser.user_id &&
                <NewMessageModal
                    receiver_id={messageState.currentMessage[0].receiver_id}
                    receiver_name={messageState.currentMessage[0].receiver_name}
                    closeModal={handleModalToggle}/>
                }
            </Fragment>
            }
        </div>
    )
}

export default MessagePage;

