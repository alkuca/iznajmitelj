import React from "react";



class InputModal extends React.Component {
    render(){
        return (
            <div className="input-modal-container">
                <div className="input-modal">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default InputModal;

