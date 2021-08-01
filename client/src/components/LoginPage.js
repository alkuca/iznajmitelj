import React from 'react';
import InputField from "./InputField";

function LoginPage () {

    return (
        <div className="auth-page">
            <div className="auth-page-logo">
                <p>Rent</p>
            </div>
            <div className="auth-container">
                <h1>Prijava</h1>
                <div className="input-form">
                    <InputField className="input-container auth-input" type="text" label="Email" name="email"/>
                    <InputField className="input-container auth-input" type="password" label="Lozinka" name="password"/>
                    <div className="auth-question">
                        <p>Nemate Račun?</p>
                        <a>Izradi ga ovdje</a>
                    </div>
                    <button>Prijavi se</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;

