import React from "react";
import avatar_icon from "../images/icons/avatar.svg"

class Navbar extends React.Component {
    render(){
        return (
            <div className="navbar-container">
                <div className="logo-container">
                    <p>Rent</p>
                </div>
                <div className="search-container">
                    <div className="inner-container">
                        <i className="fi-br-search"/>
                        <input type="text" placeholder="Pretraži..."/>
                    </div>
                </div>
                <div className="navbar-menu-container">
                    <i className="fi-br-bell bell"/>
                    <img className="avatar" src={avatar_icon} alt="Avatar"/>
                    <div className="name-container">
                        <p>Adam Smith</p>
                        <i className="fi-br-angle-small-down"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;