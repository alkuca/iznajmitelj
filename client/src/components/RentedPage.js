import React from "react";
import PageTitle from "./PageTitle";
import SelectDropdown from "./SelectDropdown";
import ItemCard from "./ItemCard";

function RentedPage () {
    return (
        <div className="rented-page-container">
            <PageTitle renderButton={false} title="Unajmljeno"/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
            </div>
            <div className="items-container">
                <ItemCard/>
            </div>
        </div>
    )
}

export default RentedPage;

