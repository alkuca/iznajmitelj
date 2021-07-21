import React from "react";
import ItemPage from "./ItemPage";

class DashboardContent extends React.Component {
    render(){
        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <ItemPage/>
                </div>
            </div>
        )
    }
}

export default DashboardContent;