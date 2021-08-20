import React, {useEffect} from "react";
import PageTitle from "./PageTitle";
import SelectDropdown from "./SelectDropdown";
import ItemCard from "./ItemCard";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";

const RentedPage = () => {

    const itemState = useSelector((state) => state.itemsState)

    const { getRentedItems } = bindActionCreators(itemActions, useDispatch())

    useEffect( ()  => {
        getRentedItems();
    }, []);

    return (
        <div className="rented-page-container">
            <PageTitle renderButton={false} title="Unajmljeno"/>
            <div className="items-container">
                { (!itemState.rentedItemsLoading ) &&
                    itemState.rentedItems.filter(item => item.renting_status === true).map( item => {
                        return <ItemCard
                            key={item.item_id}
                            item_id={item.item_id}
                            rented_item_id={item.rented_item_id}
                            name={item.item_name}
                            codeEntered={item.code_entered}
                            price={item.price_per_day}
                            duration={item.duration}
                            owner_name={item.owner_name}
                            owner_id={item.owner_id}
                            time_rent_started={item.time_rent_started}
                            showPricePerDay={true}
                            item_image={item.item_image}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default RentedPage;
