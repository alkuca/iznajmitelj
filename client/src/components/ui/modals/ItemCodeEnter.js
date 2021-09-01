import React, {useEffect, useState} from "react";
import InputModal from "../../layout/InputModal";
import {bindActionCreators} from "redux";
import {itemActions} from "../../../state";
import {useDispatch} from "react-redux";
import classnames from "classnames";

const ItemCodeEnter = props => {

    const {verifyRentedItem,getRentedOutItems} = bindActionCreators(itemActions, useDispatch())
    const [code, setCode] = useState("");
    const [codeVerified, setCodeVerified] = useState(null)

    const verifyRentedItemAction = () => {
        const data = {
            "code": code,
            "rented_item_id": props.rented_item_id
        }
        verifyRentedItem(data)
            .then(r => setCodeVerified(r))
    }

    useEffect(() => {
        if(codeVerified){
            getRentedOutItems()
            setTimeout(() => {
                props.closeModal();
            }, 600)
        }
    }, [codeVerified]);


    return (
        <InputModal>
            <div className="item-code-enter">
                <h1 className="title">Unesi sifru za:</h1>
                <h1 className="item-name">{props.item_name}</h1>
                <div className={classnames("code-enter-wrapper", {
                    "confirmed": codeVerified === true,
                    "not-confirmed": codeVerified === false
                })}>
                    <div className="code-input-container">
                        <input type="text" maxLength="5" onChange={event => setCode(event.target.value)}/>
                    </div>
                </div>
                <p>Unosom šifre započinje najam proizvoda</p>
                <div className="duration-info">
                    <p>Trajanje najma:</p>
                    <p className="duration">{props.duration} dana</p>
                </div>
                <div className="button-container">
                    <button onClick={verifyRentedItemAction} className="confirm">Započni</button>
                    <button onClick={props.closeModal} className="cancel">Odustani</button>
                </div>
            </div>
        </InputModal>
    )
}

export default ItemCodeEnter;

