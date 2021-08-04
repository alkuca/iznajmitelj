import React, {useState} from "react";
import PageTitle from "./PageTitle";
import NewMessageModal from "./NewMessageModal";

function MessagePage () {
    const [messageModal, toggleMessageModal] = useState(false);

    const handleModalToggle = () => {
        toggleMessageModal(!messageModal)
    }

    const handleSendMessage = () => {
        console.log("message send")
    }

    return (
        <div className="message-page-container">
            <PageTitle renderButton={false} title="Poruka od John Doe"/>
            <span>19.03.2021 u 15:42</span>
            <div className="full-line"/>
            <div className="message-content">
                <h1>Pitanje vezano za trajanje baterija drona</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
                    suscipit arcu, at pretium risus. adipiscing elit
                </p>
            </div>
            <button onClick={handleModalToggle}>Odgovori</button>
            {messageModal &&
                <NewMessageModal closeModal={handleModalToggle} sendMessage={handleSendMessage}/>
            }
        </div>
    )
}

export default MessagePage;

