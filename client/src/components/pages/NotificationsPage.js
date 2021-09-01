import React, {useEffect, useMemo, useState} from 'react';
import PageTitle from "../layout/PageTitle";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {notificationActions} from "../../state";
import NotificationItem from "../ui/NotificationItem";
import Pagination from "../Pagination";



const NotificationsPage = () => {

    const notificationState = useSelector((state) => state.notificationState)

    const { getUserNotifications } = bindActionCreators(notificationActions, useDispatch())

    useEffect( ()  => {
        getUserNotifications()
    }, []);

    let PageSize = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        if(!notificationState.loading){
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return notificationState.notifications.slice(firstPageIndex, lastPageIndex);
        }
    }, [currentPage,notificationState.loading]);

    return (
        <div className="statistics-page-container">
            <PageTitle renderButton={false} title="Sve Obavijesti"/>
            { (!notificationState.loading ) &&
            currentTableData.sort((a,b) => new Date(b.time_created) - new Date(a.time_created)).map( notification => {
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
            { !notificationState.loading &&
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={notificationState.notifications.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            }
        </div>
    );
};

export default NotificationsPage;