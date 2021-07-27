import React from "react";
import InputField from "./InputField";


class InputModal extends React.Component {
    render(){
        return (
            <div className="input-modal-container">
                <div className="input-modal">
                    <InputField
                        className="className"
                        type="text"
                        value="text"
                        placeholder="Product Name"
                        label="Name"
                        name="name"
                        onChange="text"
                    />
                </div>
            </div>
        )
    }
}

export default InputModal;

