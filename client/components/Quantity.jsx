import React, {useEffect, useState, useContext} from 'react'
import {useQuery} from "react-query";
import {QuantityDispatch} from './Search'

const Quantity = ({stockLevel, productId, itemPrice, basketState}) => {
    const dispatch = useContext(QuantityDispatch);
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(stockLevel);

    const newStockLevel = (stock - quantity);
    const updateBasketRequest = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({stockLevel: newStockLevel})
    };
    // const {isLoading, error, data} = useQuery('updateBasket', () =>
    //     fetch(`http://localhost:3001/basket/${productId}`, updateBasketRequest).then(response => response.json())
    // );
    // console.log(isLoading);
    // if (isLoading) return `Loading...`;
    // console.log(error);
    // console.log(`updated basked items:, ${data}`);

    useEffect(async () =>
            await fetch(`http://localhost:3001/basket/${productId}`, updateBasketRequest),
        [quantity]);

    return <>
        <div className={`quantity-stepper-controls negative ${quantity === 1 ? 'disabled' : ''}`}
             onClick={() => {
                 if (quantity > 1) {
                     const negativeQuantity = quantity - 1;
                     dispatch({
                         type: 'QUANTITY_INCREASED',
                         value: negativeQuantity,
                         productId,
                         basketState
                     });
                     setQuantity(negativeQuantity);
                 }
             }}>-
        </div>
        <input type='text'
               className='quantity-stepper'
               value={quantity}
               onChange={(event) =>
                   setQuantity(Number(event.target.value))}/>
        <div className='quantity-stepper-controls positive'
             onClick={() => {
                 if (quantity < stockLevel) {
                     const positiveQuantity = quantity + 1;
                     dispatch({
                         type: 'QUANTITY_DECREASED',
                         value: positiveQuantity,
                         productId,
                         basketState
                     });
                     setQuantity(positiveQuantity);
                 }
             }}>+
        </div>
    </>
}

export default Quantity
