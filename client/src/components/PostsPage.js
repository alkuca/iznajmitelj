import React, {useEffect} from "react";
import PageTitle from "./PageTitle";
import SelectDropdown from "./SelectDropdown";
import ItemCard from "./ItemCard";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {itemActions} from "../state";

const PostsPage = () => {

    const itemState = useSelector((state) => state.itemsState)

    const { getUserItems } = bindActionCreators(itemActions, useDispatch())

    useEffect( ()  => {
        getUserItems();
    }, []);

    return (
        <div className="posts-page-container">
            <PageTitle renderButton={false} title="Moje Objave"/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve", "Popularno", "Novo"]}/>
            </div>
            <div className="items-container">
                { (!itemState.loading ) &&
                    itemState.items.filter(item => item.item_posted === true).map( postedItem => {
                        return <ItemCard key={postedItem.item_id} item_id={postedItem.item_id} name={postedItem.item_name} price={postedItem.item_price} state={postedItem.item_state}/>
                    })
                }
            </div>
        </div>
    )
}

export default PostsPage;

