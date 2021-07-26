import React from "react";


class ConfirmationModal extends React.Component {
    render(){
        return (
            <div className="confirm-modal-container">
                <div className="confirm-modal">
                    <i className="fi-br-cloud-upload"/>
                    <p className="action">Ukloni</p>
                    <h1 className="item">Oculus Rift 2020 sa controlerima</h1>
                    <div className="button-container">
                        <button className="confirm">Ukloni</button>
                        <button className="cancel">Odustani</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmationModal;

