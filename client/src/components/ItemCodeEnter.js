import React from "react";
import InputModal from "./InputModal";

function ItemCodeEnter (props) {
    return (
        <InputModal>
            <div className="item-code-enter">
                <h1 className="title">Unesi sifru za:</h1>
                <h1 className="item-name">Mavic 73DW2021</h1>
                <div className="code-enter-wrapper">
                    <div className="code-input-container">
                        <input type="text" maxLength="5"/>
                    </div>
                </div>
                <p>Unosom šifre započinje najam proizvoda</p>
                <div className="duration-info">
                    <p>Trajanje najma:</p>
                    <p className="duration">14 dana</p>
                </div>
                <div className="button-container">
                    <button onClick={props.confirmAction} className="confirm">Započni</button>
                    <button onClick={props.closeModal} className="cancel">Odustani</button>
                </div>
            </div>
        </InputModal>
    )
}

export default ItemCodeEnter;

