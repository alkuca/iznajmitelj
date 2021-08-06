import React, {useState} from "react";
import InputModal from "./InputModal";
import PageTitle from "./PageTitle";
import DeliveryTypeCard from "./DeliveryTypeCard";
import cashImage from "../images/cash.png";
import paypalImage from "../images/paypalLogo.jpg"
import PriceWithTime from "./PriceWithTime";
import PayPal from "./PayPal";

function RentProcess (props) {

    const [step, setStep] = useState(1)
    const [rentType, setRentType] = useState("")



    const moveStep = () => {
      setStep(step + 1)
    }

    return (
        <InputModal>
            <div className="renting-process">
                {step === 1 &&
                    <div>
                        <PageTitle title="Odaberi način dostave:" renderButton={false}/>
                        <div>
                            <DeliveryTypeCard
                                moveStep={moveStep}
                                paymentImage={true}
                                paymentTypeImage={paypalImage}
                                title="Zatraži dostavu"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget suscipit arcu, at pretium risus."
                                icon="fi-rr-location-alt"
                            />
                            <DeliveryTypeCard
                                moveStep={moveStep}
                                paymentImage={true}
                                paymentTypeImage={cashImage}
                                title="Preuzimanje sa adresse iznajmitelja"
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
                        <PriceWithTime/>
                    </div>
                    <input type="number"/>
                    <div className="price-result">
                        <p>Iznos: </p>
                        <p>230 kn</p>
                    </div>
                    <div className="button-container">
                        <button onClick={moveStep} className="confirm">Dalje</button>
                        <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                    </div>
                </div>
                }
                {step === 3 &&
                <div className="code-info-container">
                    <h1>Jedinstveni kod od iznajmitelja</h1>
                    <div className="code-info">
                        <p>Prilikom preuzimanja ili dostave proizvoda dobit ćes jedinstveni kod kojeg je potrebno unjet kako bi zapoceo proces iznajmljivanja</p>
                    </div>
                    <div className="button-container">
                        <button onClick={moveStep} className="confirm">Dalje</button>
                    </div>
                </div>
                }
                {step === 4 &&
                <div>
                    <div className="summary">
                        <h1>Oculus Rift 2020</h1>
                        <div className="price-result">
                            <p>Iznos: </p>
                            <p>230 kn</p>
                        </div>
                        <div className="price-result">
                            <p>Trajanje: </p>
                            <p>14 dana</p>
                        </div>
                    </div>
                    <div className="paypal-buttons-container">
                        <PayPal/>
                    </div>
                    <div className="button-container">
                        <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
                    </div>
                </div>
                }
            </div>
        </InputModal>
    )
}

export default RentProcess;

