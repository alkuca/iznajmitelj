import React from "react";
import ItemPage from "./ItemPage";

function DashboardContent () {
    return(
        <div className="dashboard-container">
            <div className="dashboard-content">
                <ItemPage/>
            </div>
        </div>
    );
}

export default DashboardContent;