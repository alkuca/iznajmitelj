import React from "react";
import ItemPage from "./ItemPage";
import InputModal from "./InputModal";


class DashboardContent extends React.Component {
    render(){
        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <ItemPage/>
                    <InputModal/>
                </div>
            </div>
        )
    }
}

export default DashboardContent;