import React, {useEffect, useState} from "react";
import InputModal from "../../layout/InputModal";
import PageTitle from "../../layout/PageTitle";
import DeliveryTypeCard from "../DeliveryTypeCard";
import LocationWithIcon from "../LocationWithIcon";
import {bindActionCreators} from "redux";
import {itemActions, userActions} from "../../../state";
import {useDispatch, useSelector} from "react-redux";
import MapInfo from "../MapInfo";
import {Link} from "react-router-dom";


function ReturnProcess (props) {

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        returnType: 0,
    });

    const {getSingleUser} = bindActionCreators(userActions, useDispatch())
    const userState = useSelector((state) => state.userState)

    const { getRentedItems,finishRentingByRenter } = bindActionCreators(itemActions, useDispatch())

    const finishRentingByRenterAction = () => {
        finishRentingByRenter(props.rented_item_id, formData)
            .then(r => {
                if(r){
                    getRentedItems()
                    props.handleModalToggle()
                }
            })
    }

    const moveStep = () => {
        setStep(step + 1)
    }

    const setDelivery = () => {
        setFormData({ ...formData, returnType: 0 });
        moveStep()
    }

    const setOwn = () => {
        setFormData({ ...formData, returnType: 1 });
        moveStep()
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
                            moveStep={setDelivery}
                            title="Poslat ću dostavom"
                            description="Proizvod ću poslat dostavnom službom na adresu vlasnika."
                            icon="fi-rr-location-alt"
                        />
                        <DeliveryTypeCard
                            moveStep={setOwn}
                            title="Vlastito ću dostavit"
                            description="Proizvod ću vlastito dostavit na adresu vlasnika."
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
                        <div className="same-row">
                            <h1>Vlasnik:</h1>
                            <Link to={`/dashboard/profil/${props.owner_id}`}>
                                <p>{props.owner_name}</p>
                            </Link>
                        </div>
                        <div className="same-row">
                            <h1 className="red-font">Nakon predaje proizvoda zatraži šifru od vlasnika.</h1>
                        </div>
                        <MapInfo lat={userState.singleUser[0].lat}
                                 long={userState.singleUser[0].long}
                                 zoom={12}
                                 scrollWheelZoom={true}
                        />
                    </div>
                    <div className="button-container">
                        <button onClick={finishRentingByRenterAction} className="confirm">Gotovo</button>
                        <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                    </div>
                </div>
                }
            </div>
        </InputModal>
    )
}

export default ReturnProcess;

