import React from "react";
import PageTitle from "./PageTitle";
import SelectDropdown from "./SelectDropdown";
import ItemCard from "./ItemCard";

function RentedOutPage () {
    return (
        <div className="rented-out-page-container">
            <PageTitle renderButton={false} title="Iznajmljeno"/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
            </div>
            <div className="items-container">
                <ItemCard/>
            </div>
        </div>
    )
}

export default RentedOutPage;

