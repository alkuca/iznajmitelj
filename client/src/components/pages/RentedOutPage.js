import React, {useEffect} from "react";
import PageTitle from "../layout/PageTitle";
import ItemCard from "../ui/ItemCard";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../../state";

const RentedOutPage = () => {

    const itemState = useSelector((state) => state.itemsState)

    const { getRentedOutItems } = bindActionCreators(itemActions, useDispatch())

    useEffect( ()  => {
        getRentedOutItems();
    }, []);

    return (
        <div className="rented-out-page-container">
            <PageTitle renderButton={false} title="Iznajmljeno"/>
            <div className="items-container">
                { (!itemState.rentedOutItemsLoading ) &&
                    itemState.rentedOutItems.filter(item => item.renting_status === true).map( item => {
                        return <ItemCard
                            key={item.item_id}
                            item_id={item.item_id}
                            name={item.item_name}
                            price={item.price_per_day}
                            codeEntered={item.code_entered}
                            fullPrice={item.price}
                            item_image={item.item_image}
                            duration={item.duration}
                            renterName={item.renter_name}
                            renterId={item.renter_id}
                            showPricePerDay={false}
                            showLocation={false}
                            time_rent_started={item.time_rent_started}
                            renting_status={item.renting_status}
                            rented_item_id={item.rented_item_id}
                            return_type={item.return_type}
                            return_code={item.return_code}
                            returnCodeEntered={item.return_code_entered}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default RentedOutPage;

