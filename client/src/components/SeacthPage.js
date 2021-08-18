import React, {useEffect, useState} from "react";
import SelectDropdown from "./SelectDropdown";
import ItemCard from "./ItemCard";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [type, setType] = useState("Sve");
    const [states, setStates] = useState();

    const { getAllPosts } = bindActionCreators(itemActions, useDispatch())

    useEffect( () => {
        getAllPosts().then( r => setItems(r));
    }, []);


    useEffect(() => {
        let search = location.search.substring(1)
        setSearch(search)
    }, [location]);


    const handleStateChange = (e) => {
        setType(e.target.outerText)
    }

    useEffect(() => {
        if(type === "Sve"){
            setFilteredItems(
                items.filter((item) => item.item_name.toLowerCase().includes(search.toLowerCase()))
            );
        }else{
            setFilteredItems(
                items.filter((item) => item.item_name.toLowerCase().includes(search.toLowerCase()) && item.item_state === type)
            );
        }
    }, [type,items,search]);


    useEffect(() => {
        if(items){
            const a = items.map(item => item.item_state)
            a.unshift("Sve")
            setStates([...new Set(a)])
        }
    }, [items]);


        return (
            <div className="search-page-container">
                <div className="item-search-container">
                    <div className="icon-container">
                        <i className="fi-br-search"/>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Pretraži objave..."/>
                </div>
                <div className="filters-container">
                    <SelectDropdown selectItems={states}
                                    type="Županija:"
                                    active={type}
                                    onClick={handleStateChange}
                    />
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

