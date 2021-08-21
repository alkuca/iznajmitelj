import React, {useEffect} from 'react';
import PageTitle from "./PageTitle";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {notificationActions} from "../state";
import NotificationItem from "./NotificationItem";



const NotificationsPage = () => {

    const notificationState = useSelector((state) => state.notificationState)

    const { getUserNotifications } = bindActionCreators(notificationActions, useDispatch())

    useEffect( ()  => {
        getUserNotifications()
    }, []);

    return (
        <div className="statistics-page-container">
            <PageTitle renderButton={false} title="Sve Obavijesti"/>
            { (!notificationState.loading ) &&
            notificationState.notifications.slice(0).reverse().map( notification => {
                return <NotificationItem
                    className="notification-container-page"
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
        </div>
    );
};

export default NotificationsPage;