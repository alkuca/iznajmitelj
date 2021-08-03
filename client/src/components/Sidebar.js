import React from "react";
import LinkWithIcon from "./LinkWithIcon";

class Sidebar extends React.Component {
    render(){
        return (
            <div className="sidebar-container">
                <div className="inner-container">
                    <div className="links-container">
                        {/* <LinkWithIcon text="Nadzorna ploča" icon="home"/> */}
                        <LinkWithIcon text="Moje stvari" icon="box" location="/dashboard/items"/>
                        <LinkWithIcon text="Moje objave" icon="document" location="/dashboard/objave"/>
                        <LinkWithIcon text="Unajmljeno" icon="box" location="/dashboard/unajmljeno"/>
                        <LinkWithIcon text="Poruke" icon="comment-alt" location="/dashboard/poruke"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;