import React, {useState} from 'react';
import PageTitle from "./PageTitle";
import ItemCard from "./ItemCard";
import SelectDropdown from "./SelectDropdown";
import AddItem from "./AddItem";

function MyItemsPage () {
    const [addItemModal, toggleItemModal] = useState(false)
    const [editItemModal, toggleEditItemModal] = useState(false)

    const handleAddModalClick = () => {
        toggleItemModal(!addItemModal)
    }

    const handleEditModalClick = () => {
        toggleEditItemModal(!editItemModal)
    }

    return (
        <div className="my-items">
            <PageTitle renderButton={true} buttonText="Dodaj" title="Moje stvari" buttonAction={handleAddModalClick}/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
            </div>
            <div className="items-container">
                <ItemCard/>
            </div>
            {  addItemModal && <AddItem closeModal={handleAddModalClick}/> }
        </div>
    )
}

export default MyItemsPage;

