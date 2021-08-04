import React from "react";
import PageTitle from "./PageTitle";

function PostsPage () {
    return (
        <div className="posts-page-container">
            <PageTitle renderButton={false} title="Moje Objave"/>
        </div>
    )
}

export default PostsPage;

