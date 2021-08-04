import React from 'react';
import InputField from "./InputField";
import {Link} from "react-router-dom";

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
                        <Link to="/auth/register">
                            Izradi ga ovdje
                        </Link>
                    </div>
                    <button>Prijavi se</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;

