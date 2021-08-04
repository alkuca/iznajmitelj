import React from "react";
import SelectDropdown from "./SelectDropdown";
import ItemCard from "./ItemCard";

function SearchPage () {
        return (
            <div className="search-page-container">
                <div className="item-search-container">
                    <div className="icon-container">
                        <i className="fi-br-search"/>
                    </div>
                    <input type="text" placeholder="Pretraži proizvode dostupne za unajmiti..."/>
                </div>
                <div className="filters-container">
                    <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
                    <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
                    <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
                </div>
                <div className="card-container">
                    <ItemCard/>
                </div>
            </div>
        )

}

export default SearchPage;

