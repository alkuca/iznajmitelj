import React, {useState} from 'react';
import InputField from "./InputField";
import {Link} from "react-router-dom";
import axios from "axios";

function RegisterPage () {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        street: "",
        number: "",
        city: "",
        lat: "",
        long: ""
    });

    const onFormChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    });

    const register = () => {
        getCoordinates()
    }

    // reverse geocoding (transform address to lat, long)
    const getCoordinates = async () => {
       await axios
            .get(`https://nominatim.openstreetmap.org/search?q=${formData.street}+${formData.number}+${formData.city}&format=geojson`)
            .then(res => {
                const coordinates = res.data.features[0].geometry.coordinates
                setFormData({
                    ...formData,
                    lat: coordinates[0],
                    long: coordinates[1]
                })
            })
    }

    return (
        <div className="auth-page">
            <div className="auth-page-logo">
                <p>Rent</p>
            </div>
            <div className="auth-container">
                <h1>Izrada Računa</h1>
                <div className="input-form">
                    <InputField className="input-container auth-input" type="text" label="Email" name="email"/>
                    <InputField className="input-container auth-input" type="password" label="Lozinka" name="password"/>
                    <InputField className="input-container auth-input" type="text" label="Ulica" name="street" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="text" label="Broj" name="number" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="text" label="Grad" name="city" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="text" label="Županija" name="State"/>
                    <div className="auth-question">
                        <p>Već imate Račun?</p>
                        <Link to="/auth/login">
                            Prijavi se ovdje
                        </Link>
                    </div>
                    <button onClick={register}>Izradi Račun</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;

