import React, {useEffect} from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {withRouter} from "react-router-dom";


function DashboardContent (props) {

    const getCurrentUser = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard", {
                method: "POST",
                headers: { token: localStorage.token }
            });
            return await res.json();
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getCurrentUser().then(r => console.log(r));
    }, []);

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

export default withRouter(DashboardContent);