import React from 'react'
import DetailCard from './DetailCard'
import {useSelector} from 'react-redux'
import {useParams} from "react-router-dom";

const OrderDetail = () => {
    const {tracking_number} = useParams();
    const data = useSelector(({orderStore}) => orderStore);
    const trackingData = data && Object.keys(data).filter(trackingNumber => trackingNumber === tracking_number);
    return <> {
        trackingData && <div className="form detail-view">
            <DetailCard cardInfo={data[trackingData]}
                        key={trackingData}/>
        </div>
    }
    </>
}

export default OrderDetail
