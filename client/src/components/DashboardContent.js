import React from "react";
import ItemCard from "./ItemCard";
import PageTitle from "./PageTitle";


class DashboardContent extends React.Component {
    render(){
        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <PageTitle title="Moje stvari" renderButton={true} buttonText="Dodaj"/>
                    <ItemCard/>
                </div>
            </div>
        )
    }
}

export default DashboardContent;