import React from 'react';

function PageTitle (props) {

    const title = props.title;
    const renderButton = props.renderButton
    const buttonText = props.buttonText
    const buttonAction = props.buttonAction

    return (
        <div className="title-container">
            <h1>{title}</h1>
            {renderButton && <button onClick={buttonAction}>{buttonText}</button>}
        </div>
    )
}

export default PageTitle;

