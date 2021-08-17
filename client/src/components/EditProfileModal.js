import React, {useState} from "react";
import InputModal from "./InputModal";
import InputField from "./InputField";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {userActions} from "../state";
import {getCurrentUser} from "../state/actions/user";

const EditProfileModal = props => {


    const {editProfile, getSingleUser} = bindActionCreators(userActions, useDispatch())

    const [formData, setFormData] = useState({
        street: "",
        street_number: "",
        city: "",
        state: "",
        lat: "",
        long:""
    });

    const onFormChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    });

    const gatherUserInputs = () => {
        if(formData.street && formData.city && formData.state && formData.street_number){
            getCoordinates()
                .then(coordinates =>
                    addCoordinatesToForm(coordinates)
                        .then(fullForm =>
                            editProfile(fullForm)
                                .then(r => getSingleUser(),
                                    props.handleModalToggle()
                                )
                        ))
        }else{
            alert("nedostaju podaci")
        }
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

    const getCoordinates = async () => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${formData.street}+${formData.street_number}+${formData.city}&format=geojson`, {
                    method: "GET",
                });
            const parseRes = await res.json();
            return parseRes.features[0].geometry.coordinates
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <InputModal>
            <div className="new-message-modal-container">
                <InputField className="input-container" type="text" label="Grad" name="city" onChange={e => onFormChange(e)}/>
                <InputField className="input-container" type="text" label="Županija" name="state" onChange={e => onFormChange(e)}/>
                <InputField className="input-container" type="text" label="Ulica" name="street" onChange={e => onFormChange(e)}/>
                <InputField className="input-container" type="text" label="Broj Ulice" name="street_number" onChange={e => onFormChange(e)}/>
            </div>
            <div className="button-container">
                <button onClick={gatherUserInputs} className="confirm">Spremi</button>
                <button onClick={props.handleModalToggle} className="cancel">Odustani</button>
            </div>
        </InputModal>
    )
}

export default EditProfileModal;

