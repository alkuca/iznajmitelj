import React, {useEffect, useState} from "react";
import SelectDropdown from "./SelectDropdown";
import ItemCard from "./ItemCard";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const itemState = useSelector((state) => state.itemsState)

    const { getAllItems,getAllPosts } = bindActionCreators(itemActions, useDispatch())

    useEffect( () => {
        getAllPosts().then( r => setItems(r));
    }, []);

    useEffect(() => {
        setFilteredItems(
            items.filter((item) =>
                item.item_name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, items]);

    useEffect(() => {
        let search = location.search.substring(1)
        setSearch(search)
    }, [location]);

        return (
            <div className="search-page-container">
                <div className="item-search-container">
                    <div className="icon-container">
                        <i className="fi-br-search"/>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Pretraži objave..."/>
                </div>
                <div className="filters-container">
                    <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
                    <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
                    <SelectDropdown selectItems={["Sve","Popularno","Novo"]}/>
                </div>
                <div className="items-container">
                    {
                        filteredItems.map( item => {
                            return <ItemCard
                                key={item.item_id}
                                item_id={item.item_id}
                                name={item.item_name}
                                state={item.item_state}
                                price={item.item_price}
                                showPricePerDay={true}
                                showLocation={true}
                            />
                            })
                    }
                </div>
            </div>
        )
}

export default SearchPage;

