import React from "react";
import PageTitle from "./PageTitle";
import Message from "./Message";
import SelectDropdown from "./SelectDropdown";

function MessagesPage () {
    return (
        <div className="messages-page-container">
            <PageTitle renderButton={false} title="Poruke"/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
            </div>
            <div className="messages-container">
                <Message read={false}/>
                <Message read={false}/>
                <Message read={true}/>
                <Message read={true}/>
            </div>
        </div>
    )
}

export default MessagesPage;

