import React from "react";
import SidebarLink from "./SidebarLink";

class Sidebar extends React.Component {
    render(){
        return (
            <div className="sidebar-container">
                <div className="inner-container">
                    <div className="links-container">
                        <SidebarLink text="Nadzorna ploča" icon="home"/>
                        <SidebarLink text="Moje stvari" icon="comment-alt"/>
                        <SidebarLink text="Moje objave" icon="document"/>
                        <SidebarLink text="Unajmljeno" icon="box"/>
                        <SidebarLink text="Poruke" icon="bell"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;