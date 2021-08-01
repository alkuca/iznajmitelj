import React from 'react';
import InputField from "./InputField";

function RegisterPage () {

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
                    <InputField className="input-container auth-input" type="text" label="Email" name="email"/>
                    <InputField className="input-container auth-input" type="password" label="Lozinka" name="password"/>
                    <div className="auth-question">
                        <p>Već imate Račun?</p>
                        <a>Prijavi se ovdje</a>
                    </div>
                    <button>Izradi Račun</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;

