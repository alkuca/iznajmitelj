import React from "react";
import ItemCard from "./ItemCard";


class DashboardContent extends React.Component {
    render(){
        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <ItemCard/>
                    <ItemCard/>
                </div>
            </div>
        )
    }
}

export default DashboardContent;