import React, {useEffect} from "react";
import PageTitle from "./PageTitle";
import Message from "./Message";
import SelectDropdown from "./SelectDropdown";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {messageActions} from "../state";

const MessagesPage = () => {

    const messageState = useSelector((state) => state.messageState)

    const { getUserMessages } = bindActionCreators(messageActions, useDispatch())

    useEffect( ()  => {
        getUserMessages();
    }, []);

    return (
        <div className="messages-page-container">
            <PageTitle renderButton={false} title="Poruke"/>
            <div className="messages-container">
                { (!messageState.loading ) &&
                    messageState.messages.map( message => {
                        return <Message
                            key={message.message_id}
                            message_id={message.message_id}
                            title={message.message_title}
                            text={message.message_text}
                            sender={message.sender_name}
                            read={message.message_is_read}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default MessagesPage;

