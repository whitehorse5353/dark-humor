import React from 'react'
import {useNavigate} from "react-router-dom";

const Card = ({cardInfo}) => {
    const {items, checkpoints} = cardInfo;
    const {tracking_number, status_text, status_details} = checkpoints[0];
    const history = useNavigate();
    return <>
        <div className="card-item-title">
            Order Number
            <div className="card-item-value">
                {items[0].orderNo}
            </div>
            <span className="back-arrow" onClick={() => history.goBack()}><span>&#8249;</span></span>
        </div>
        <div className="card-item-title">
            Delivery Address
            <div className="card-item-value">
                {items[0].street}
                <div>{items[0].zip_code}
                    <span> {items[0].city}</span>
                </div>
            </div>
        </div>
        <div className="nested-form detail-view">
            <div className="card-item-title">
                Tracking Number
                <div className="card-item-value">
                    {tracking_number}
                </div>
            </div>
            <div className="card-item-title">
                Current Status
                <div className="card-item-value">
                    {status_text}
                    <span className="card-item-value-sub-text">
                    {status_details}
                    </span>
                </div>
            </div>
        </div>
        {items[0].articleImageUrl && <div className="nested-form detail-view article-holder">
            <div className="card-item-title">
                Articles
            </div>
            {
                items.map(item => {
                    return item.articleImageUrl && <div className="article-img-holder" key={item.articleNo}>
                        <span className="article-quantity">x{item.quantity}</span>
                        <img src={item.articleImageUrl} alt={item.product_name} width="40" height="40"/>
                        <span className="article-title">{item.product_name}
                            <span className="article-id">{item.articleNo}</span>
                        </span>
                    </div>
                })
            }
        </div>}
    </>
}
export default Card
