import React from "react";
import PageTitle from "./PageTitle";

function ProfilePage () {
    return (
        <div className="profile-page-container">
            <PageTitle renderButton={false} title="Moj Profil"/>
        </div>
    )
}

export default ProfilePage;

