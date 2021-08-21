import React, {useEffect} from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {userActions} from "../state";


function DashboardContent (props) {

    const { getCurrentUser } = bindActionCreators(userActions, useDispatch())

    useEffect( ()  => {
        getCurrentUser();
    });

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