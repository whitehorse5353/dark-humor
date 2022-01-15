import React from 'react'
import {useNavigate} from "react-router-dom";

const Card = ({cardInfo, checkpointInfo}) => {
    const history = useNavigate();
    const switchView = () => history.push(`/orderDetail/${cardInfo.tracking_number}`);
    return <>
        <div className="nested-form" onClick={switchView}>
            <div className="card-item-title">
                Order Number
                <div className="card-item-value">
                    {cardInfo.orderNo}
                </div>
            </div>
            <div className="card-item-title">
                Current Status
                <div className="card-item-value">
                    {checkpointInfo.status_text}
                </div>
            </div>
            <div className="card-item-title">
                Delivery Address
                <div className="card-item-value">
                    {cardInfo.street}
                    <div>{cardInfo.zip_code}
                        <span> {cardInfo.city}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Card
