import React, {useEffect, useMemo, useState} from "react";
import SelectDropdown from "../ui/SelectDropdown";
import ItemCard from "../ui/ItemCard";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../../state";
import { useLocation } from "react-router-dom";
import Pagination from "../Pagination";


const SearchPage = () => {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [state, setState] = useState("Sve");
    const [category, setCategory] = useState("Sve");

    const { getAllPosts } = bindActionCreators(itemActions, useDispatch())

    const categories = [
        "Informatika","Sport i oprema","Odjeća","Strojevi i alati","Za djecu","Audio i video","Glazba","Literatura",
        "Za kućne ljubimce","Sve za dom","Auto oprema","Kampiranje","Plaža",
    ]

    const states = [
        "Bjelovarsko-bilogorska","Brodsko-posavska","Dubrovačko-neretvanska","Grad Zagreb","Istarska","Karlovačka","Koprivničko-križevačka",
        "Krapinsko-zagorska","Ličko-senjska","Međimurska","Osječko-baranjska","Požeško-slavonska","Primorsko-goranska",
        "Sisačko-moslavačka","Splitsko-dalmatinska","Šibensko-kninska","Varaždinska","Virovitičko-podravska","Vukovarsko-srijemska",
        "Zadarska","Zagrebačka"
    ]

    useEffect( () => {
        getAllPosts().then( r => setItems(r));
    }, []);


    useEffect(() => {
        let search = location.search.substring(1)
        setSearch(search)
    }, [location]);


    const handleStateChange = (e) => {
        setState(e.target.outerText)
    }
    const handleStateChange2 = (e) => {
        setCategory(e.target.outerText)
    }

    useEffect(() => {
        if(state === "Sve" && category === "Sve"){
            setFilteredItems(
                items.map((item) => item)
            );
            console.log(1)
        }
        if(state !== "Sve" && category === "Sve"){
            setFilteredItems(
                items.filter((item) => item.item_state === state)
            );
            console.log(2)
        }
        if(state === "Sve" && category !== "Sve"){
            setFilteredItems(
                items.filter((item) => item.item_category === category)
            );
            console.log(3)
        }
        if(state !== "Sve" && category !== "Sve"){
            setFilteredItems(
                items.filter((item) => item.item_state === state && item.item_category === category)
            );
            console.log(4)
        }
    }, [state,items,category]);

    let PageSize = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredItems.slice(firstPageIndex, lastPageIndex);
    }, [currentPage,filteredItems]);


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
                                    active={state}
                                    onClick={handleStateChange}
                    />
                    <SelectDropdown selectItems={categories}
                                    type="Kategorija:"
                                    active={category}
                                    onClick={handleStateChange2}
                    />
                </div>
                <div className="items-container">
                    {
                        currentTableData.filter((item) => item.item_name.toLowerCase().includes(search.toLowerCase())).map( item => {
                            return <ItemCard
                                key={item.item_id}
                                item_id={item.item_id}
                                name={item.item_name}
                                state={item.item_state}
                                price={item.item_price}
                                item_image={item.item_image}
                                showPricePerDay={true}
                                showLocation={true}
                            />
                        })
                    }
                </div>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filteredItems.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        )
}

export default SearchPage;

