import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";

const NotificationItem = props => {

    return (
        <div className="notification-container">

            {props.type === "renting" &&
                <Fragment>
                    <i className="fi-br-arrow-small-down"/>
                    <p className="notification-data">
                        <Link to={`/dashboard/profil/${props.maker_id}`}>{props.maker} </Link>
                        je iznajmio
                        <span> {props.related_item_name} </span>
                        {props.delivery_type !== 0 ? "i zatražio dostavu na svoju adresu." : "kojeg ce vlastito preuzeti."}
                    </p>
                </Fragment>

            }
            <Moment format="YYYY/MM/DD">
                {props.time_created}
            </Moment>
        </div>
    )
}

export default NotificationItem;