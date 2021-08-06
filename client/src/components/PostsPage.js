import React from "react";
import PageTitle from "./PageTitle";
import SelectDropdown from "./SelectDropdown";
import ItemCard from "./ItemCard";

function PostsPage() {
    return (
        <div className="posts-page-container">
            <PageTitle renderButton={false} title="Moje Objave"/>
            <div className="filter-container">
                <SelectDropdown selectItems={["Sve", "Popularno", "Novo"]}/>
            </div>
            <div className="items-container">
                <ItemCard/>
            </div>
        </div>
    )
}

export default PostsPage;

