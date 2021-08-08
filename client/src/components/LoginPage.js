import React,{useState} from 'react';
import InputField from "./InputField";
import {Link} from "react-router-dom";

function LoginPage ({setAuth}) {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        try {
            const body = { email, password };
            const response = await fetch(
                "http://localhost:5000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
            } else {
                setAuth(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page-logo">
                <p>Rent</p>
            </div>
            <div className="auth-container">
                <h1>Prijava</h1>
                <div className="input-form">
                    <InputField className="input-container auth-input" type="text" label="Email" name="email" value={email} onChange={e => onChange(e)}/>
                    <InputField className="input-container auth-input" type="password" label="Lozinka" name="password" value={password} onChange={e => onChange(e)}/>
                    <div className="auth-question">
                        <p>Nemate Račun?</p>
                        <Link to="/auth/register">
                            Izradi ga ovdje
                        </Link>
                    </div>
                    <button onClick={onSubmitForm}>Prijavi se</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;

