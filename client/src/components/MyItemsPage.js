import React from 'react';
import PageTitle from "./PageTitle";
import ItemCard from "./ItemCard";
import SelectDropdown from "./SelectDropdown";

function MyItemsPage () {

    return (
        <div className="my-items">
            <PageTitle renderButton={true} buttonText="Dodaj" title="Moje stvari"/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
            </div>
            <div className="items-container">
                <ItemCard/>
            </div>
        </div>
    )
}

export default MyItemsPage;

