import React, {useState} from 'react';
import PageTitle from "./PageTitle";
import ItemCard from "./ItemCard";
import SelectDropdown from "./SelectDropdown";
import CreateItemModal from "./CreateItemModal";
import {useSelector} from "react-redux";

function ItemsPage () {
    const [addItemModal, toggleItemModal] = useState(false)

    const handleAddModalClick = () => {
        toggleItemModal(!addItemModal)
    }

    const itemState = useSelector((state) => state.itemsState)
    const currentUser = useSelector((state => state.userState.currentUser))

    return (
        <div className="my-items-page">
            <PageTitle renderButton={true} buttonText="Dodaj" title="Moje Stvari" buttonAction={handleAddModalClick}/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
            </div>
            <div className="items-container">
                { !itemState.loading &&
                    itemState.items.map( item => {
                        return <ItemCard key={item.item_id} item_id={item.item_id} name={item.item_name} price={item.item_price} state={item.item_state}/>
                    })
                }
            </div>
            {  addItemModal && <CreateItemModal closeModal={handleAddModalClick}/> }
        </div>
    )
}

export default ItemsPage;

