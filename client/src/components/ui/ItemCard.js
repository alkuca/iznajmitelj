import React, {Fragment, useEffect, useState} from "react";
import item from "../../images/LogoF.svg";
import PriceWithTime from "./PriceWithTime";
import LocationWithIcon from "./LocationWithIcon";
import SettingsDropdown from "./SettingsDropdown";
import ConfirmationModal from "../layout/ConfirmationModal";
import ItemCodeEnter from "./modals/ItemCodeEnter";
import SettingDropdownButton from "./SettingDropdownButton";
import {Link, withRouter} from 'react-router-dom';
import ReturnProcess from "./modals/ReturnProcess";
import {bindActionCreators} from "redux";
import {itemActions} from "../../state";
import {useDispatch} from "react-redux";
import moment from "moment";
import classnames from "classnames";
import LazyLoad from 'react-lazyload';
import ReturnCodeEnter from "./modals/ReturnCodeEnter";

const ItemCard = props => {

    const [postConfirmation, togglePostConfirmation] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)
    const [codeEnterModal, toggleCodeEnterModal] = useState(false)
    const [returnCodeEnterModal, toggleReturnCodeEnterModal] = useState(false)
    const [returnProcessModal, toggleReturnProcessModal] = useState(false)
    const [timePassed, setTimePassed] = useState(false)

    const deleteNote = "Jeste li sigurni da želite trajno izbrisat odabrani proizvod?"
    const postNote = "Klikom na objavi proizvod postaje vidljiv ostalim korisnicima."

    const { postItem, deletePost, getUserItems, finishRentingByOwner,getRentedOutItems,deleteItem } = bindActionCreators(itemActions, useDispatch())

    const handlePostClick = () => {
        togglePostConfirmation(!postConfirmation)
    }

    const handleCodeEnterClick = () => {
        toggleCodeEnterModal(!codeEnterModal)
    }

    const handleReturnCodeEnterClick = () => {
        toggleReturnCodeEnterModal(!returnCodeEnterModal)
    }

    const handleReturnClick = () => {
        toggleReturnProcessModal(!returnProcessModal)
    }

    const handleDeleteClick = () => {
        toggleDeleteConfirmation(!deleteConfirmation)
    }

    const deleteItemAction = async () => {
        await deleteItem(props.item_id)
        getUserItems();
    }

    const postItemAction = async () => {
        await postItem(props.item_id);
        getUserItems()
        handlePostClick();
    }

    const deletePostAction = async () => {
        await deletePost(props.item_id);
        getUserItems()
        handleDeleteClick();
    }

    const finishRentingByOwnerAction = () => {
        finishRentingByOwner(props.item_id)
            .then(r => {
                if(r){
                    getRentedOutItems()
                }
            })
    }

    const start_date  = moment(props.time_rent_started);
    const new_date = moment(start_date);
    const date_rent_ends = new_date.add(props.duration, 'days');

    useEffect(() => {
        if(moment().isAfter(date_rent_ends)){
            setTimePassed(true)
        }else{
            setTimePassed(false)
        }
    }, []);

    return (
        <LazyLoad height={200}>
        <div className={classnames("item-card-container", {
            "is-renting-glow": window.location.pathname === "/dashboard/unajmljeno" && props.codeEntered && !timePassed
        })}>
            <Link to={`/dashboard/stvar/${props.item_id}`}>
                <div className="image-container">
                    <div className="card-image-container">
                        <img src={props.item_image ? props.item_image : item} alt="item"/>
                    </div>
                    {window.location.pathname === "/dashboard/unajmljeno" &&
                    <div className="image-overlay">
                        {props.codeEntered ?
                            <Fragment>
                                {timePassed && props.return_type === null &&
                                    <Fragment>
                                        <p>NAJAM ZAVRŠIO</p>
                                        <p>Vrati proizvod</p>
                                    </Fragment>
                                }
                                {!timePassed && props.return_type === null &&
                                    <Fragment>
                                        <p>Datum završetka najma:</p>
                                        <time>{date_rent_ends.format("DD.MM.YYYY")}</time>
                                    </Fragment>
                                }
                                {props.return_type !== null &&
                                <Fragment>
                                    <p>Povratak u tijeku</p>
                                    {!props.returnCodeEntered ?
                                        <p>Čekanje na šifru</p>
                                        :
                                        <p>Šifra unesena</p>
                                    }
                                </Fragment>
                                }
                            </Fragment>
                            :
                            <Fragment>
                                <i className="locked fi-rr-lock"/>
                                <p>Predaj šifru najmodavcu</p>
                            </Fragment>
                        }
                    </div>
                    }
                    {window.location.pathname === "/dashboard/iznajmljeno" &&
                    <div className="image-overlay">
                        {props.codeEntered ?
                            <Fragment>
                                {timePassed && props.return_type === null &&
                                <Fragment>
                                    <p>NAJAM ZAVRŠIO</p>
                                    <p>Čekanje na povrat proizvoda</p>
                                </Fragment>
                                }
                                {!timePassed && props.return_type !== null &&
                                <Fragment>
                                    <p>NAJAM ZAVRŠEN RANIJE</p>
                                    <p>Povrat proizvoda u tijeku</p>
                                </Fragment>
                                }
                                {!timePassed && props.return_type === null &&
                                <Fragment>
                                    <p>Datum zavšetka najma:</p>
                                    <time>{date_rent_ends.format("DD.MM.YYYY")}</time>
                                </Fragment>
                                }
                                {props.return_type !== null && !props.returnCodeEntered &&
                                <p>Nakon primitka proizvoda, predaj šifru unajmitelju</p>
                                }
                                {props.return_type !== null && props.returnCodeEntered &&
                                <Fragment>
                                    <p>Šifra Unesena</p>
                                    <p>Završi najam</p>
                                </Fragment>
                                }
                            </Fragment>
                            :
                            <p>Unesi šifru nakon predaje proizvoda</p>
                        }
                    </div>
                    }
                </div>
            </Link>
                <div className="data-container">
                    <h1>{props.name}</h1>
                    <div className="full-line-small"/>
                    <Fragment>
                        {props.showLocation &&
                            <LocationWithIcon state={props.state} detailed={false}/>
                        }
                        {props.showPricePerDay &&
                            <PriceWithTime price={props.price} timeFormat="24h"/>
                        }
                        {props.showTotalPrice &&
                            <p>{props.totalPrice}</p>
                        }
                        {(!props.codeEntered && props.code) &&
                            <p className="item-code">{props.code}</p>
                        }
                        {(props.codeEntered && window.location.pathname === "/dashboard/iznajmljeno" && !props.renting_status) &&
                        <p className="item-code">ZAVRŠENO</p>
                        }
                        {props.renterName &&
                            <Fragment>
                                {(props.codeEntered && props.return_type !== null && window.location.pathname === "/dashboard/iznajmljeno" && !props.returnCodeEntered) &&
                                <p className="item-code">{props.return_code}</p>
                                }
                                {props.return_type === null &&
                                <p>Iznajmljeno na {props.duration} dana za {props.fullPrice} Kn</p>
                                }
                                <div className="same-row card-renter">
                                    <p>Unajmitelj:</p>
                                    <Link to={`/dashboard/profil/${props.renterId}`}>
                                        {props.renterName}
                                    </Link>
                                </div>
                                {props.return_type !== null && props.returnCodeEntered &&
                                    <button onClick={finishRentingByOwnerAction} className="enter-code-button">Završi</button>
                                }
                            </Fragment>
                        }
                        {props.owner_name &&
                        <Fragment>
                            <div className="same-row card-renter">
                                <p>VLASNIK:</p>
                                <Link to={`/dashboard/profil/${props.owner_id}`}>
                                    {props.owner_name}
                                </Link>
                            </div>
                        </Fragment>
                        }
                    </Fragment>
                    {(!props.codeEntered && window.location.pathname === "/dashboard/iznajmljeno") &&
                        <button onClick={handleCodeEnterClick} className="enter-code-button">Unesi šifru</button>
                    }
                    {(props.codeEntered && props.return_type === null && window.location.pathname === "/dashboard/unajmljeno") &&
                        <button onClick={handleReturnClick} className="enter-code-button">
                            {
                                timePassed ? "Vrati" : "Vrati Ranije"
                            }
                        </button>
                    }
                    {(props.codeEntered && props.return_type !== null && !props.returnCodeEntered && window.location.pathname === "/dashboard/unajmljeno") &&
                    <button onClick={handleReturnCodeEnterClick} className="enter-code-button">Unesi šifru</button>
                    }
                </div>

            {/* card dropdown shows only on dashboard/stvari and dashboard/objave */}

            {window.location.pathname === "/dashboard/stvari" &&
            <SettingsDropdown>
                {props.item_posted ?
                    <Fragment>
                        <SettingDropdownButton className="dropdown-item button-disabled" buttonText="Objavi"
                                               icon="eye"/>
                        <SettingDropdownButton className="dropdown-item red-font button-disabled" buttonText="Ukloni" icon="trash red-font"/>
                    </Fragment>
                    :
                    <Fragment>
                        <SettingDropdownButton className="dropdown-item" buttonAction={handlePostClick} buttonText="Objavi"
                                               icon="eye"/>
                        <SettingDropdownButton className="dropdown-item red-font" buttonAction={handleDeleteClick}
                                               buttonText="Ukloni" icon="trash red-font"/>
                    </Fragment>
                }
            </SettingsDropdown>
            }
            {window.location.pathname === "/dashboard/objave" &&
            <SettingsDropdown>
                <SettingDropdownButton className="dropdown-item red-font" buttonAction={handleDeleteClick}
                                       buttonText="Ukloni objavu" icon="eye-crossed red-font"/>
            </SettingsDropdown>
            }

            {/* confirmation modals */}

            {postConfirmation &&
            <ConfirmationModal note={postNote} icon="fi-br-file-add color-blue" actionName="Objavi" buttonText="Objavi"
                               type="positive" confirmAction={postItemAction} closeModal={handlePostClick}/>
            }
            {(deleteConfirmation && window.location.pathname === "/dashboard/stvari") &&
            <ConfirmationModal note={deleteNote}
                               icon="fi-br-trash color-red"
                               actionName="Ukloni"
                               buttonText="Ukloni"
                               type="negative"
                               relatedItem={props.name + " ?"}
                               confirmAction={deleteItemAction}
                               closeModal={handleDeleteClick}
            />
            }
            {(deleteConfirmation && window.location.pathname === "/dashboard/objave") &&
            <ConfirmationModal note={deleteNote} icon="fi-br-trash color-red" actionName="Ukloni objavu"
                               buttonText="Ukloni" type="negative" confirmAction={deletePostAction}
                               closeModal={handleDeleteClick}/>
            }
            {codeEnterModal &&
            <ItemCodeEnter
                closeModal={handleCodeEnterClick}
                item_name={props.name}
                duration={props.duration}
                rented_item_id={props.rented_item_id}
            />
            }
            {returnCodeEnterModal &&
            <ReturnCodeEnter
                closeModal={handleReturnCodeEnterClick}
                item_name={props.name}
                rented_item_id={props.rented_item_id}
            />
            }
            {returnProcessModal &&
            <ReturnProcess
                handleModalToggle={handleReturnClick}
                rented_item_id={props.rented_item_id}
                owner_id={props.owner_id}
                owner_name={props.owner_name}
                item_id={props.item_id}
                />
            }
        </div>
        </LazyLoad>
    )
}

export default withRouter(ItemCard);

