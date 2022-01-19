import React, {useEffect, useState, useContext} from 'react'
import {QuantityDispatch} from './Basket'

const Quantity = ({stockLevel, productId, item}) => {
    const dispatch = useContext(QuantityDispatch);
    const [quantity, setQuantity] = useState(1);
    const newStockLevel = (stockLevel - quantity);

    const updateBasketRequest = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({stockLevel: newStockLevel})
    };

    useEffect(async () =>
            await fetch(`http://localhost:3001/basket/${productId}`, updateBasketRequest),
        [quantity]);

    return <>
        <div className={`quantity-stepper-controls negative ${quantity === 1 ? 'disabled' : ''}`}
             onClick={() => {
                 if (quantity > 1) {
                     const negativeQuantity = quantity - 1;
                     item.stockQuantity = negativeQuantity;
                     dispatch({
                         type: 'QUANTITY_DECREASED',
                         stockQuantity: negativeQuantity,
                         productId,
                         item,
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
                     item.stockQuantity = positiveQuantity;
                     dispatch({
                         type: 'QUANTITY_INCREASED',
                         stockQuantity: positiveQuantity,
                         productId,
                         item,
                     });
                     setQuantity(positiveQuantity);
                 }
             }}>+
        </div>
    </>
}

export default Quantity
