import React from 'react';
import Moment from "react-moment";


const HistoryCard = props => {
    return (
        <div className="history-card">
            <p>{props.item_name}</p>
            <p>{props.renter_name}</p>
            <Moment format="DD.MM.YYYY">
                {props.item_date}
            </Moment>
            <p>{props.price} Kn</p>
        </div>
    );
};

export default HistoryCard;