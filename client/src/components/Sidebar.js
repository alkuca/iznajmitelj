import React from "react";
import LinkWithIcon from "./LinkWithIcon";

class Sidebar extends React.Component {
    render(){
        return (
            <div className="sidebar-container">
                <div className="inner-container">
                    <div className="links-container">
                        {/* <LinkWithIcon text="Nadzorna ploča" icon="home"/> */}
                        <LinkWithIcon text="Moje stvari" icon="box"/>
                        <LinkWithIcon text="Moje objave" icon="document"/>
                        <LinkWithIcon text="Unajmljeno" icon="box"/>
                        <LinkWithIcon text="Poruke" icon="comment-alt"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;