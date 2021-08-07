import React, {useState} from "react";
import PageTitle from "./PageTitle";
import avatar_icon from "../images/icons/avatar.svg";
import EditProfileModal from "./EditProfileModal";

function ProfilePage () {
    const [editModal, toggleEditModal] = useState(false);

    const handleModalToggle = () => {
        toggleEditModal(!editModal)
    }

    const editInfo = () => {
        console.log("Profile edited")
    }

    return (
        <div className="profile-page-container">
            <PageTitle renderButton={false} title="Moj Profil"/>
            <div className="contact-container">
                <img src={avatar_icon} alt="avatar"/>
                <div className="full-line"/>
                <div className="info">
                    <div>
                        <p>Email: </p>
                        <p className="weight-500">jsmith@gmail.com</p>
                    </div>
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
                    <div>
                        <p>Županija: </p>
                        <p className="weight-500">Zagreb</p>
                    </div>
                </div>
            </div>
            <button onClick={handleModalToggle}>Uredi</button>
            {editModal &&
                <EditProfileModal editInfo={editInfo} handleModalToggle={handleModalToggle}/>
            }
        </div>
    )
}

export default ProfilePage;

