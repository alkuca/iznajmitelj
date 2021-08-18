import React, {useEffect, useState} from "react";
import InputModal from "./InputModal";
import PageTitle from "./PageTitle";
import DeliveryTypeCard from "./DeliveryTypeCard";
import cashImage from "../images/cash.png";
import paypalImage from "../images/paypalLogo.jpg"
import LocationWithIcon from "./LocationWithIcon";
import {bindActionCreators} from "redux";
import {itemActions, userActions} from "../state";
import {useDispatch, useSelector} from "react-redux";
import MapInfo from "./MapInfo";


function ReturnProcess (props) {

    const [step, setStep] = useState(1)

    const {getSingleUser} = bindActionCreators(userActions, useDispatch())
    const userState = useSelector((state) => state.userState)

    const { finishRentingByOwner, getRentedItems } = bindActionCreators(itemActions, useDispatch())

    const finishRentingByOwnerAction = () => {
        finishRentingByOwner(props.item_id)
            .then(r => {
                if(r){
                    getRentedItems()
                }
            })
    }

    const moveStep = () => {
        setStep(step + 1)
    }

    useEffect(() => {
        getSingleUser(props.owner_id)
    }, [props.owner_id]);

    return (
        <InputModal>
            <div className="return-process">
                {step === 1 &&
                <div>
                    <PageTitle title="Odaberi način povrata stvari:" renderButton={false}/>
                    <div className="delivery-cards">
                        <DeliveryTypeCard
                            moveStep={moveStep}
                            paymentImage={false}
                            paymentTypeImage={paypalImage}
                            title="Poslat ću dostavom"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium risus."
                            icon="fi-rr-location-alt"
                        />
                        <DeliveryTypeCard
                            moveStep={moveStep}
                            paymentImage={false}
                            paymentTypeImage={cashImage}
                            title="Vlastito ću dostavit"
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
                <div className="map-step-return">
                    <div className="map-container">
                        <div className="same-row">
                            <h1>Adresa za povrat:</h1>
                            <LocationWithIcon detailed={true}
                                              item_city={userState.singleUser[0].user_city}
                                              item_street={userState.singleUser[0].user_street}
                                              item_street_number={userState.singleUser[0].user_street_number}
                            />
                        </div>
                        <MapInfo lat={userState.singleUser[0].lat}
                                 long={userState.singleUser[0].long}
                                 zoom={12}
                                 scrollWheelZoom={true}
                        />
                    </div>
                    <div className="button-container">
                        <button onClick={finishRentingByOwnerAction} className="confirm">Gotovo</button>
                        <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                    </div>
                </div>
                }
            </div>
        </InputModal>
    )
}

export default ReturnProcess;

