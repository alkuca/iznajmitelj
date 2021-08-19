import React, {Fragment} from 'react';
import avatar_icon from "../images/icons/avatar.svg";

const ContactInfo = props => {
    return (
        <Fragment>
            <div className="contact-container">
                <img src={avatar_icon} alt="avatar"/>
                <div className="info">
                    <div>
                        <p>Email: </p>
                        <p className="weight-500">{props.email}</p>
                    </div>
                    <div className="full-line"/>
                    <div>
                        <p>Ime i prezime: </p>
                        <p className="weight-500">{props.name}</p>
                    </div>
                    <div>
                        <p>Adresa: </p>
                        <p className="weight-500">{props.street} {props.street_number}</p>
                    </div>
                    <div>
                        <p>Grad: </p>
                        <p className="weight-500">{props.city}</p>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default ContactInfo;