import React, {useEffect, useState} from 'react';
import PageTitle from "./PageTitle";
import ItemCard from "./ItemCard";
import SelectDropdown from "./SelectDropdown";
import CreateItemModal from "./CreateItemModal";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";
import Loader from "./Loader";

function ItemsPage () {
    const [addItemModal, toggleItemModal] = useState(false)
    const [filtered, setFiltered] = useState([])

    const handleAddModalClick = () => {
        toggleItemModal(!addItemModal)
    }

    const itemState = useSelector((state) => state.itemsState)

    const { getUserItems, getRentedOutItems } = bindActionCreators(itemActions, useDispatch())

    useEffect( ()  => {
        getUserItems();
    }, []);

    useEffect( ()  => {
        getRentedOutItems();
    }, []);

    const filter = () => {
        const arr1 = itemState.items.filter((item => !item.item_posted))
        const arr2 = itemState.rentedOutItems;
        const filtered = arr1.filter((item) => !arr2.some((item2) => item.item_id === item2.item_id && item2.renting_status));
        setFiltered(filtered)
    }

    useEffect( ()  => {
        if(!itemState.loading && !itemState.rentedOutItemsLoading){
            filter()
        }
    }, [itemState]);

    return (
        <div className="my-items-page">
            <PageTitle renderButton={true} buttonText="Dodaj" title="Moje Stvari" buttonAction={handleAddModalClick}/>
            <div className="items-container">
                { (!itemState.loading && !itemState.rentedOutItemsLoading ) ?
                    filtered.length ?
                        filtered.map( item => {
                            return <ItemCard
                                item_posted={item.item_posted}
                                key={item.item_id}
                                item_id={item.item_id}
                                name={item.item_name}
                                price={item.item_price}
                                state={item.item_state}
                                item_image={item.item_image}
                                showPricePerDay={true}
                                showLocation={true}
                            />
                        })
                        :
                        <p>Trenutno nema stvari za prikazat</p>
                    :
                    <Loader/>
                }


            </div>
            {  addItemModal && <CreateItemModal closeModal={handleAddModalClick}/> }
        </div>
    )
}

export default ItemsPage;