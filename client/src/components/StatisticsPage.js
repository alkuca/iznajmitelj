import React, {useEffect} from 'react';
import PageTitle from "./PageTitle";
import SelectDropdown from "./SelectDropdown";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";
import HistoryCard from "./HistoryCard";


const StatisticsPage = props => {

    const itemState = useSelector((state) => state.itemsState)
    const userState = useSelector((state) => state.userState)

    const { getRentedOutItems,getRentedItems } = bindActionCreators(itemActions, useDispatch())

    useEffect( ()  => {
        getRentedOutItems();
        getRentedItems()
    }, []);

    return (
        <div className="statistics-page-container">
            <PageTitle renderButton={false} title="Povijest"/>
            <div className="history-container">
                <h4>Unajmljeno:</h4>
                <div className="history-items-container rented">
                    { (!itemState.rentedItemsLoading ) &&
                    itemState.rentedItems.filter(item => item.renting_status === false && item.renter_id === userState.currentUser.user_id).map( item => {
                        return <HistoryCard
                            key={item.rented_item_id}
                            item_id={item.item_id}
                            item_name={item.item_name}
                            price={item.price}
                            item_date={item.time_rent_started}
                            renter_name={item.owner_name}
                        />
                    })
                    }
                </div>
            </div>
            <div className="history-container">
                <h4>Iznajmljeno:</h4>
                <div className="history-items-container rented-out">
                    { (!itemState.rentedOutItemsLoading ) &&
                    itemState.rentedOutItems.filter(item => item.renting_status === false && item.owner_id === userState.currentUser.user_id).map( item => {
                        return <HistoryCard
                            key={item.rented_item_id}
                            item_id={item.item_id}
                            item_name={item.item_name}
                            item_date={item.time_rent_started}
                            price={item.price}
                            renter_name={item.renter_name}
                        />
                    })
                    }
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;