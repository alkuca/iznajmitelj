import React, {useEffect} from "react";
import classnames from "classnames";
import NotificationItem from "./NotificationItem";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {notificationActions} from "../../state";
import {Link} from "react-router-dom";

const NotificationDropdown = props => {

    const notificationState = useSelector((state) => state.notificationState)

    const {clearUserNotifications, getUserNotifications} = bindActionCreators(notificationActions, useDispatch())

    const clearUserNotificationsAction = () => {
        clearUserNotifications().then( r => {
            if(r){
                props.clearNotificationsA()
                getUserNotifications()
            }
        })
        props.handleNotificationToggleClick()
    }

    return (
        <div className={classnames("notification-dropdown", {
            "t2": props.notificationDropdown
        })}>
            <div className="notification-buttons">
                <Link to="/dashboard/obavijesti"><button className="clear-notifications">Prikaži sve</button></Link>
                <button onClick={clearUserNotificationsAction} className="clear-notifications">Izbriši</button>
            </div>
            { (!notificationState.loading ) &&
            notificationState.notifications.sort((a,b) => new Date(b.time_created) - new Date(a.time_created)).filter(n => !n.clear_notification).map( notification => {
                return <NotificationItem
                    className="notification-container"
                    key={notification.notification_id}
                    maker={notification.notification_maker_name}
                    maker_id={notification.notification_maker_id}
                    type={notification.notification_type}
                    related_item_name={notification.related_item_name}
                    delivery_type={notification.delivery_type}
                    time_created={notification.time_created}
                    return_type={notification.return_type}
                    isCleared={notification.clear_notification}
                />
            })
            }
            {!props.hasNotifications &&
            <p className="no-notifications">Trenutno nema obavijesti</p>
            }
        </div>
    )
}

export default NotificationDropdown;