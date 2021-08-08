import React, {useState} from 'react';
import PageTitle from "./PageTitle";
import ItemCard from "./ItemCard";
import SelectDropdown from "./SelectDropdown";
import AddItem from "./AddItem";

function ItemsPage () {
    const [addItemModal, toggleItemModal] = useState(false)

    const handleAddModalClick = () => {
        toggleItemModal(!addItemModal)
    }

    return (
        <div className="my-items-page">
            <PageTitle renderButton={true} buttonText="Dodaj" title="Moje Stvari" buttonAction={handleAddModalClick}/>
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

export default ItemsPage;
