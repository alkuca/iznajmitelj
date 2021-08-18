import React from "react";
import LinkWithIcon from "./LinkWithIcon";
import {withRouter} from 'react-router-dom';

function Sidebar () {
        return (
            <div className="sidebar-container">
                <div className="inner-container">
                    <div className="links-container">
                        {/* <LinkWithIcon text="Nadzorna ploča" icon="home"/> */}
                        <LinkWithIcon text="Moje stvari" icon="box" goTo="/dashboard/stvari"/>
                        <LinkWithIcon text="Moje objave" icon="document" goTo="/dashboard/objave"/>
                        <LinkWithIcon text="Unajmljeno" icon="arrow-small-down" goTo="/dashboard/unajmljeno"/>
                        <LinkWithIcon text="Iznajmljeno" icon="arrow-small-up" goTo="/dashboard/iznajmljeno"/>
                        <LinkWithIcon text="Statistika" icon="stats" goTo="/dashboard/statistika"/>
                        <LinkWithIcon text="Poruke" icon="comment-alt" goTo="/dashboard/poruke"/>
                    </div>
                </div>
            </div>
        )
}

export default withRouter(Sidebar);