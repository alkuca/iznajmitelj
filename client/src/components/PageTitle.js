import React from 'react';

function PageTitle (props) {

    return (
        <div className="title-container">
            <h1>{props.title}</h1>
            {props.renderButton &&
            <button onClick={props.buttonAction}>{props.buttonText}</button>
            }
        </div>
    )
}

export default PageTitle;