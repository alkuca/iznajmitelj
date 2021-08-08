import React from 'react';
import avatar_icon from "../images/icons/avatar.svg";

const ContactInfo = () => {
    return (
        <div className="contact-container">
            <img src={avatar_icon} alt="avatar"/>
            <div className="info">
                <div>
                    <p>Email: </p>
                    <p className="weight-500">jsmith@gmail.com</p>
                </div>
                <div className="full-line"/>
                <div>
                    <p>Ime i prezime: </p>
                    <p className="weight-500">John Smith</p>
                </div>
                <div>
                    <p>Adresa: </p>
                    <p className="weight-500">Zagrebačka 37b</p>
                </div>
                <div>
                    <p>Grad: </p>
                    <p className="weight-500">Zagreb</p>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;