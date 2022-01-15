import React, {useEffect} from 'react'
import Card from './Card.jsx'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, useParams} from "react-router-dom"
import {fetchOrdersByEmail} from '../store/OrderReducer'

const CardComponent = (data, user_email) => {
    const orderData = data && Object.keys(data);
    const history = useNavigate();
    if (orderData && data.isLoading) {
        return <div>Loading...</div>
    } else if (orderData) {
        return orderData.length ? orderData.map(trackingNumber => {
            return <Card cardInfo={data[trackingNumber].items[0]}
                         checkpointInfo={data[trackingNumber].checkpoints[0]}
                         key={trackingNumber}/>
        }) : <span
            className="unavailable-order">No order's available for the given email address <strong>{user_email}</strong></span>
    } else {
        history.push('/');
    }
}

const Orders = () => {
    const {user_email} = useParams();
    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchOrdersByEmail(user_email)), []);
    const data = useSelector(({orderStore}) => orderStore);
    return <>
        <div className="form">
            <h3>
                Your Orders
            </h3>
            {
                CardComponent(data, user_email)
            }
        </div>
    </>
}

export default Orders
