import React, {useEffect, useState} from "react";
import InputModal from "../../layout/InputModal";
import {bindActionCreators} from "redux";
import {itemActions} from "../../../state";
import {useDispatch} from "react-redux";
import classnames from "classnames";

const ReturnCodeEnter = props => {

    const {verifyReturnItem,getRentedItems} = bindActionCreators(itemActions, useDispatch())
    const [code, setCode] = useState("");
    const [codeVerified, setCodeVerified] = useState(null)

    const verifyReturnItemAction = () => {
        const data = {
            "code": code,
            "rented_item_id": props.rented_item_id
        }
        verifyReturnItem(data)
            .then(r => setCodeVerified(r))
    }

    useEffect(() => {
        if(codeVerified){
            getRentedItems()
            setTimeout(() => {
                props.closeModal();
            }, 600)
        }
    }, [codeVerified]);


    return (
        <InputModal>
            <div className="item-code-enter">
                <h1 className="title">Unesi šifru za:</h1>
                <h1 className="item-name">{props.item_name}</h1>
                <div className={classnames("code-enter-wrapper", {
                    "confirmed": codeVerified === true,
                    "not-confirmed": codeVerified === false
                })}>
                    <div className="code-input-container">
                        <input type="text" maxLength="5" onChange={event => setCode(event.target.value)}/>
                    </div>
                </div>
                <p>Unos šifre potvđuje povratak proizvoda</p>
                <div className="button-container">
                    <button onClick={verifyReturnItemAction} className="confirm">Unesi</button>
                    <button onClick={props.closeModal} className="cancel">Odustani</button>
                </div>
            </div>
        </InputModal>
    )
}

export default ReturnCodeEnter;

