import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


function DashboardContent (props) {
    return(
        <div>
            <Navbar setAuth={props.setAuth}/>
            <Sidebar/>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;