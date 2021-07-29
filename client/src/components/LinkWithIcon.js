import React from "react";

class LinkWithIcon extends React.Component {
    render(){
        return (
            <div className="link-with-icon">
                <i className={`fi-br-${this.props.icon}`}/>
                <a>{this.props.text}</a>
            </div>
        )
    }
}

export default LinkWithIcon;

