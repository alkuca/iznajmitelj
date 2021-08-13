import React, {useEffect, useState} from 'react';
import PageTitle from "./PageTitle";
import ItemCard from "./ItemCard";
import SelectDropdown from "./SelectDropdown";
import CreateItemModal from "./CreateItemModal";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions, userActions} from "../state";

function ItemsPage () {
    const [addItemModal, toggleItemModal] = useState(false)

    const handleAddModalClick = () => {
        toggleItemModal(!addItemModal)
    }

    const itemState = useSelector((state) => state.itemsState)

    const { getUserItems } = bindActionCreators(itemActions, useDispatch())

    useEffect( ()  => {
        getUserItems();
    }, []);

    return (
        <div className="my-items-page">
            <PageTitle renderButton={true} buttonText="Dodaj" title="Moje Stvari" buttonAction={handleAddModalClick}/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
            </div>
            <div className="items-container">
                { (!itemState.loading ) &&
                    itemState.items.map( item => {
                        return <ItemCard item_posted={item.item_posted} key={item.item_id} item_id={item.item_id} name={item.item_name} price={item.item_price} state={item.item_state}/>
                    })
                }
            </div>
            {  addItemModal && <CreateItemModal closeModal={handleAddModalClick}/> }
        </div>
    )
}

export default ItemsPage;