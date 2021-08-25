import React, {useEffect} from "react";
import PageTitle from "../layout/PageTitle";
import Message from "../ui/Message";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {messageActions} from "../../state";

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
                    messageState.messages.slice(0).reverse().map( message => {
                        return <Message
                            key={message.message_id}
                            message_id={message.message_id}
                            title={message.message_title}
                            text={message.message_text}
                            sender={message.sender_name}
                            sender_id={message.sender_id}
                            read={message.message_is_read}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default MessagesPage;

