import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";

const NotificationItem = props => {
    return (
        <div className={props.className + (props.isCleared ? " is-cleared" : "")}>
            {props.type === "renting" &&
                <Fragment>
                    <i className="fi-br-arrow-small-down"/>
                    <p className="notification-data">
                        <Link to={`/dashboard/profil/${props.maker_id}`}>{props.maker} </Link>
                        je iznajmio
                        <Link to="/dashboard/iznajmljeno"> { props.related_item_name } </Link>
                        {props.delivery_type === 1 ? "kojeg će vlastito preuzeti." : "i zatražio dostavu na svoju adresu"}
                    </p>
                </Fragment>
            }
            {props.type === "renting_finished" &&
            <Fragment>
                <i className="fi-br-arrow-small-up"/>
                <p className="notification-data">
                    <Link to={`/dashboard/profil/${props.maker_id}`}>{props.maker} </Link>
                    je završio sa iznajmljivanjem
                    <Link to="/dashboard/iznajmljeno"> { props.related_item_name } </Link>
                    {props.return_type !== 0 ? "kojeg će vlastito dostaviti." : "i vratit će ga dostavnom službom"}
                </p>
            </Fragment>
            }
            {props.type === "new_message" &&
            <Fragment>
                <i className="fi-rr-comment-alt"/>
                <p className="notification-data">
                    <Link to={`/dashboard/profil/${props.maker_id}`}>{props.maker} </Link>
                     ti je poslao novu poruku
                    <Link to="/dashboard/poruke"> {props.related_item_name}</Link>
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