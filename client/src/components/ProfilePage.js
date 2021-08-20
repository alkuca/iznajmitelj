import React, {Fragment, useEffect, useState} from "react";
import PageTitle from "./PageTitle";
import avatar_icon from "../images/profileDefaultLarge.svg";
import EditProfileModal from "./EditProfileModal";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions, userActions} from "../state";
import MapInfo from "./MapInfo";
import NewMessageModal from "./NewMessageModal";
import Loader from "./Loader";

const ProfilePage = props => {
    const [editModal, toggleEditModal] = useState(false);
    const [newMessageModal, toggleNewMessageModal] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)

    const [selectedFile, setSelectedFile] = useState()

    const { uploadItemImage } = bindActionCreators(itemActions, useDispatch())
    const {getSingleUser, changeAvatar, getCurrentUser} = bindActionCreators(userActions, useDispatch())
    const userState = useSelector((state) => state.userState)

    const handleModalToggle = () => {
        toggleEditModal(!editModal)
    }

    const handleMessageModalToggle = () => {
        toggleNewMessageModal(!newMessageModal)
    }


    const handleClick = e => {
        setSelectedFile(e.target.files[0])
    }


    useEffect(() => {
        getSingleUser(props.match.params.user_id)
    }, []);

    useEffect(() => {
        if(selectedFile){
            setImageUploading(true)
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                uploadItemImage(reader.result).then( r => {
                    if(r.url){
                        changeAvatar(r.url).then(r => {
                                if(r){
                                    getSingleUser(props.match.params.user_id);
                                    getCurrentUser();
                                    setImageUploading(false)
                                }
                        })
                    }else{
                        alert("pokusaj ponovno")
                    }
                })
            }
        }
    }, [selectedFile]);


    return (
        <div className="profile-page-container">
            {userState.singleUser[0] &&
            <Fragment>
                {userState.singleUser[0].user_id === userState.currentUser.user_id ?
                    <PageTitle renderButton={true} buttonText="Uredi" buttonAction={handleModalToggle} title="Moj Profil"/>
                    :
                    <PageTitle renderButton={true} buttonText="Poruka" buttonAction={handleMessageModalToggle} title={`Profil od ${userState.singleUser[0].user_name}`}/>
                }
                <div className="contact-container">
                    <div className="change-profile-container">
                        {imageUploading && <Loader className="loader-container"/>}
                        <label>
                            <input type="file" name="image" onChange={handleClick}/>
                            {!imageUploading &&
                            <img className="profile-image"
                                 src={userState.singleUser[0].user_image ? userState.singleUser[0].user_image : avatar_icon} alt="avatar"/>
                            }
                            <div className="upload-hover">
                                {!imageUploading &&
                                <div>
                                    <i className="fi-rr-cloud-upload"/>
                                    <p>Promjeni</p>
                                </div>
                                }
                            </div>
                        </label>
                    </div>
                    <div className="full-line"/>
                    <div className="info">
                        <div>
                            <p>Email: </p>
                            <p className="weight-500">{userState.singleUser[0].user_email}</p>
                        </div>
                        <div>
                            <p>Ime i prezime: </p>
                            <p className="weight-500">{userState.singleUser[0].user_name}</p>
                        </div>
                        <div>
                            <p>Adresa: </p>
                            <p className="weight-500">{userState.singleUser[0].user_street} {userState.singleUser[0].user_street_number}</p>
                        </div>
                        <div>
                            <p>Grad: </p>
                            <p className="weight-500">{userState.singleUser[0].user_city}</p>
                        </div>
                        <div>
                            <p>Županija: </p>
                            <p className="weight-500">{userState.singleUser[0].user_state}</p>
                        </div>
                    </div>
                </div>
                {userState.singleUser[0].user_id === userState.currentUser.user_id ?
                    <div className="profile-map-container">
                        <h3>Moja lokacija:</h3>
                        <MapInfo lat={userState.currentUser.lat}
                                 long={userState.currentUser.long}
                                 zoom={15}
                                 scrollWheelZoom={true}
                        />
                    </div>
                    :
                    <div className="profile-map-container">
                        <h3>Lokacija:</h3>
                        <MapInfo lat={userState.singleUser[0].lat}
                                 long={userState.singleUser[0].long}
                                 zoom={15}
                                 scrollWheelZoom={true}
                        />
                    </div>
                }

                {editModal &&
                    <EditProfileModal handleModalToggle={handleModalToggle} id={props.match.params.user_id}/>
                }
                {newMessageModal &&
                <NewMessageModal
                    receiver_name={userState.singleUser[0].user_name}
                    receiver_id={userState.singleUser[0].user_id}
                    closeModal={handleMessageModalToggle}/>
                }
            </Fragment>
            }
        </div>
    )
}

export default ProfilePage;

