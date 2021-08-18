import React, {useEffect, useState} from "react";
import InputModal from "./InputModal";
import PageTitle from "./PageTitle";
import DeliveryTypeCard from "./DeliveryTypeCard";
import cashImage from "../images/cash.png";
import paypalImage from "../images/paypalLogo.jpg"
import PriceWithTime from "./PriceWithTime";
import PayPal from "./PayPal";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";
import {useHistory} from "react-router-dom";

function RentProcess (props) {

    const userState = useSelector((state) => state.userState)
    const itemState = useSelector((state) => state.itemsState)

    const history = useHistory();

    const {rentItem} = bindActionCreators(itemActions, useDispatch())

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        id: "",
        itemOwner: "",
        name: "",
        renterName:userState.currentUser.user_name,
        ownerName: userState.singleUser[0].user_name,
        rentType: 0,
        price: "",
        finalPrice: 0,
        duration: 0,
        paid: false
    });


    const moveStep = () => {
      setStep(step + 1)
    }

    const setDelivery = () => {
        setFormData({ ...formData, rentType: 0 });
        moveStep()
    }

    const setOwn = () => {
        setFormData({ ...formData, rentType: 1 });
        moveStep()
    }

    const OnDurationChange = e => setFormData({
        ...formData,
        duration: e.target.value,
        finalPrice: e.target.value * itemState.currentItem[0].item_price
    });

    const rentItemAction = () => {
        rentItem(formData)
        history.push("/dashboard/unajmljeno")
    }

    useEffect(() => {
        setFormData({
            ...formData,
            id: itemState.currentItem[0].item_id,
            itemOwner: itemState.currentItem[0].item_owner,
            name: itemState.currentItem[0].item_name,
            price: itemState.currentItem[0].item_price
        });
    }, []);

    return (
        <InputModal>
            <div className="renting-process">
                {step === 1 &&
                    <div>
                        <PageTitle title="Odaberi način dostave:" renderButton={false}/>
                        <div>
                            <DeliveryTypeCard
                                data-mssg="Hello!"
                                moveStep={setDelivery}
                                title="Zatraži dostavu"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium risus."
                                icon="fi-rr-location-alt"
                            />
                            <DeliveryTypeCard
                                moveStep={setOwn}
                                title="Vlastito preuzimanje"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu."
                                icon="fi-rr-home"
                            />
                            <div className="button-container">
                                <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                            </div>
                        </div>
                    </div>
                }
                {step === 2 &&
                <div className="duration-step">
                    <h1>Odaberi kolicinu dana iznajmljivnja</h1>
                    <div className="price-info">
                        <p>Cijena:</p>
                        <PriceWithTime price={itemState.currentItem[0].item_price} timeFormat="24h"/>
                    </div>
                    <input type="number" value={formData.duration} onChange={e => OnDurationChange(e)}/>
                    <div className="price-result">
                        <p>Iznos: </p>
                        <p>{formData.finalPrice} kn</p>
                    </div>
                    <div className="button-container">
                        {formData.duration > 2 ?
                            <button onClick={moveStep} className="confirm">Dalje</button>
                            :
                            <button onClick={moveStep} className="confirm button-disabled">Dalje</button>
                        }
                        <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                    </div>
                </div>
                }
                {step === 3 &&
                <div className="code-info-container">
                    <i className="fi-rr-exclamation icon-large"/>
                    <h1>Jedinstveni kod od iznajmitelja</h1>
                    <div className="code-info">
                        <p>Prilikom preuzimanja ili dostave proizvoda dobit ćes jedinstveni kod kojeg je potrebno unjet kako bi zapoceo proces iznajmljivanja</p>
                    </div>
                    <div className="button-container">
                        <button onClick={rentItemAction} className="confirm">Unajmi</button>
                        <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                    </div>
                </div>
                }
            </div>
        </InputModal>
    )
}

export default RentProcess;

