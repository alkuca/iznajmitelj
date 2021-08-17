import React from "react";
import PageTitle from "./PageTitle";
import Loader from "./Loader";

function HelpPage () {
    return (
        <div className="help-page-container">
            <PageTitle renderButton={false} title="Pitanja i odgovori"/>
            <Loader/>
        </div>
    )
}

export default HelpPage;

