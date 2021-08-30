import React, {useEffect, useState} from 'react';
import InputField from "../ui/InputField";
import {Link, useHistory} from "react-router-dom";
import logo from "../../images/LogoF.svg";
import LoaderWhite from "../ui/LoaderWhite";

const RegisterPage = props => {

    const [registerLoading, setRegisterLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        street: "",
        street_number: "",
        city: "",
        state: ""
    });

    const history = useHistory();

    const onFormChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    });

    const gatherUserInputs = async () => {
        await setRegisterLoading(true)
        getCoordinates()
            .then(coordinates => {
                if (coordinates) {
                    addCoordinatesToForm(coordinates)
                        .then(fullForm =>
                            register(fullForm))
                }else{
                    alert("Kriva adresa, upisi puni naziv ulice npr: Ulica Ljudevita Gaja ili Zagrebačka ulica")
                    setRegisterLoading(false)
                }
            })
    }

    const addCoordinatesToForm = async coordinates => {
        const fullForm = {
            ...formData
        }
        if(coordinates){
            fullForm.lat = coordinates[0];
            fullForm.long = coordinates[1]
        }

        return fullForm
    }

    const register = async fullForm => {
        try {
            const res = await fetch(
                "/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(fullForm)
                }
            );
            console.log(fullForm)
            const parseRes = await res.json();
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                props.setAuth(true);
                history.push("/dashboard/stvari")
            } else {
                props.setAuth(false);
            }
            setRegisterLoading(false)
        } catch (err) {
            console.error(err.message);
        }
    }

    // reverse geocoding (transform address to lat, long)
    const getCoordinates = async () => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=
                ${formData.street}+${formData.street_number}+
                ${formData.city}&format=geojson`, {
                method: "GET",
            });
            const parseRes = await res.json();
            return parseRes.features[0].geometry.coordinates
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if(props.isAuthenticated){
            history.push("/dashboard/stvari")
        }
    }, [props.isAuthenticated]);

    return (
        <div className="auth-page">
            <div className="auth-page-logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="auth-container">
                <h1>Izrada Računa</h1>
                <div className="input-form">
                    <InputField className="input-container auth-input" type="text" label="Email*" name="email" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="text" label="Ime i prezime*" name="name" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="password" label="Lozinka*" name="password" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="text" label="Puni naziv ulice*" name="street" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="text" label="Broj*" name="street_number" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="text" label="Grad*" name="city" onChange={e => onFormChange(e)}/>
                    <InputField className="input-container auth-input" type="text" label="Županija*" name="state" onChange={e => onFormChange(e)}/>
                    <div className="auth-question">
                        <p>Već imate Račun?</p>
                        <Link to="/auth/login">
                            Prijavi se ovdje
                        </Link>
                    </div>
                    <button onClick={gatherUserInputs}>{registerLoading ? <LoaderWhite/> : "Izradi Račun"}</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;

