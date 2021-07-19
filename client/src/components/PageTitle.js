import React from 'react';

function PageTitle (props) {

    const title = props.title;
    const renderButton = props.renderButton
    const buttonText = props.buttonText

    return (
        <div className="title-container">
            <h1>{title}</h1>
            {renderButton && <button>{buttonText}</button>}
        </div>
    )
}

export default PageTitle;

