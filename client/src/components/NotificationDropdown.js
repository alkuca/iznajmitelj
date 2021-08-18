import React from "react";
import classnames from "classnames";
import NotificationItem from "./NotificationItem";
import {useSelector} from "react-redux";

const NotificationDropdown = props => {

    const notificationState = useSelector((state) => state.notificationState)

    return (
        <div className={classnames("notification-dropdown", {
            "t2": props.notificationDropdown
        })}>
            { (!notificationState.loading ) &&
            notificationState.notifications.map( notification => {
                return <NotificationItem
                    key={notification.notification_id}
                    maker={notification.notification_maker_name}
                    maker_id={notification.notification_maker_id}
                    type={notification.notification_type}
                    related_item_name={notification.related_item_name}
                    delivery_type={notification.delivery_type}
                    time_created={notification.time_created}
                />
            })
            }
        </div>
    )
}

export default NotificationDropdown;