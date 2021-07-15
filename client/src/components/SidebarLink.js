import React from "react";

class SidebarLink extends React.Component {
    render(){
        return (
            <div className="sidebar-link">
                <i className={`fi-br-${this.props.icon}`}/>
                <a>{this.props.text}</a>
            </div>
        )
    }
}

export default SidebarLink;

