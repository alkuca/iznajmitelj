import React, {useState} from "react";
import InputModal from "./InputModal";
import PageTitle from "./PageTitle";
import DeliveryTypeCard from "./DeliveryTypeCard";
import cashImage from "../images/cash.png";
import paypalImage from "../images/paypalLogo.jpg"
import LocationWithIcon from "./LocationWithIcon";

function ReturnProcess (props) {

    const [step, setStep] = useState(1)

    const moveStep = () => {
        setStep(step + 1)
    }
    return (
        <InputModal>
            <div className="renting-process">
                {step === 1 &&
                <div>
                    <PageTitle title="Odaberi način povrata stvari:" renderButton={false}/>
                    <div>
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
                <div className="code-info-container">
                    <h1>Jedinstveni kod za iznajmitelja</h1>
                    <div className="code-info">
                        <p>Prilikom povrata proizvoda potrebno je iznajmitelju priložiti ovaj jedinstveni kod</p>
                    </div>
                    <div className="generated-code">
                        <p>62896</p>
                    </div>
                    <div className="button-container">
                        <button onClick={moveStep} className="confirm">Dalje</button>
                        <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                    </div>
                </div>
                }
                {step === 3 &&
                <div className="map-step">
                    <LocationWithIcon/>
                </div>
                }
            </div>
        </InputModal>
    )
}

export default ReturnProcess;

