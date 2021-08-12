import React, {useEffect} from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {userActions, itemActions} from "../state";


function DashboardContent (props) {

    const itemState = useSelector((state) => state.item)
    const { getCurrentUser } = bindActionCreators(userActions, useDispatch())
    const { getUserItems } = bindActionCreators(itemActions, useDispatch())


    useEffect(() => {
        getCurrentUser();
        getUserItems();
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