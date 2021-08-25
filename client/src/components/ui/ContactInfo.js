import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

const ContactInfo = props => {
    return (
        <Fragment>
            <div className="contact-container">
                <img src={props.user_image} alt="avatar"/>
                <div className="info">
                    <div>
                        <p>Email: </p>
                        <p className="weight-500">{props.email}</p>
                    </div>
                    <div className="full-line"/>
                    <div>
                        <p>Ime i prezime: </p>
                        <Link to={`/dashboard/profil/${props.user_id}`}>
                            <p className="weight-500">{props.name}</p>
                        </Link>
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