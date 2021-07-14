import React from "react";
import bell_icon from "../images/icons/bell.svg"
import search_icon from "../images/icons/search.svg"
import avatar_icon from "../images/icons/avatar.svg"
import arrow_down_icon from "../images/icons/arrow-down.svg"

class Navbar extends React.Component {
    render(){
        return (
            <div className="navbar-container">
                <div className="logo-container">
                    <p>Rent</p>
                </div>
                <div className="search-container">
                    <div className="inner-container">
                        <img src={search_icon} alt="Search"/>
                        <input type="text" placeholder="Pretraži..."/>
                    </div>
                </div>
                <div className="navbar-menu-container">
                    <img className="bell" src={bell_icon} alt="Notification"/>
                    <img className="avatar" src={avatar_icon} alt="Avatar"/>
                    <div className="name-container">
                        <p>Adam Smith</p>
                        <img src={arrow_down_icon} alt="Dropdown"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;