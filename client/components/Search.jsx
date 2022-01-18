import React, {useEffect, useReducer, useState} from 'react'
import {useQuery} from 'react-query';
import Quantity from './Quantity';

export const QuantityDispatch = React.createContext(null);

const Basket = () => {

    const VATPercentage = 20;

    let [subTotal, setSubTotal] = useState(0);

    const computeSubTotal = (basketState) => basketState.reduce((accumulatedPrice, item) => {
        if (item.stockQuantity) {
            return accumulatedPrice + (item.price * item.stockQuantity);
        }
        return accumulatedPrice + item.price;
    }, 0);

    const getVATPercentage = () => (VATPercentage / 100) * subTotal;

    const quantityReducer = (state, {type, basket, stockQuantity, productId, item}) => {
        switch (type) {
            case 'SET_BASKET_STATE':
                const getSubtotalInitialState = computeSubTotal(basket);
                setSubTotal(getSubtotalInitialState);
                return basket;
            case 'UPDATE_BASKET_STATE':
                const getSubtotalUpdateState = computeSubTotal(basket);
                setSubTotal(getSubtotalUpdateState);
                return basket;
            case 'QUANTITY_DECREASED':
                const getSubtotalUpdateStateWhenQuantityRemoved = computeSubTotal(state);
                setSubTotal(getSubtotalUpdateStateWhenQuantityRemoved);
                return [...state];
            case 'QUANTITY_INCREASED':
                const getSubtotalUpdateStateWhenQuantityAdded = computeSubTotal(state);
                setSubTotal(getSubtotalUpdateStateWhenQuantityAdded);
                return [...state];
            default:
                return state;
        }
    }

    const [quantityState, dispatch] = useReducer(quantityReducer, {});
// console.log(quantityState);
// console.log('quantityState');
    const deleteBasketItem = async (id) => {
        const deleteBasketRequest = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        await fetch(`http://localhost:3001/basket/${id}`, deleteBasketRequest).then(async response => {
            const updatedBasket = await response.json();
            // setBasketState(updatedBasket);
            dispatch({
                type: 'UPDATE_BASKET_STATE',
                basket: updatedBasket,
            });
        });
    }

    useEffect(async () => {
        await fetch(`http://localhost:3001/basket`).then(async response => {
            const {basket} = await response.json();
            dispatch({
                type: 'SET_BASKET_STATE',
                basket,
            });
        })
    }, []);

    return <>
        <nav>
            <a className="links logo" href="#">Apps</a>
            <div className="rightSection">
                <a className="selected links" href="#">Products</a>
                <a className="links" href="#">News</a>
                <a className="links" href="#">Contact</a>
                <a className="links" href="#">Checkout Basket</a>
            </div>
        </nav>
        <table>
            <caption className="primary">Your Basket</caption>
            <caption className="secondary">Items you have added to your basket are shown below. Adjust the quantities or
                remove items before continuing purchase.
            </caption>
            <thead>
            <tr>
                <th scope="col" className="left bold highlighter">Product</th>
                <th scope="col" className="bold highlighter">Price</th>
                <th scope="col" className="bold highlighter">Quantity</th>
                <th scope="col" className="right bold highlighter">Cost</th>
                <th scope="col" className="highlighter"></th>
            </tr>
            </thead>
            <tbody>
            <QuantityDispatch.Provider value={dispatch}>
                {quantityState.length && quantityState.map(item => {
                    return <tr key={item.sku}>
                        <td data-label="" className="left">{`${item.name}, ${!item.size ? 'one size' : item.size}`}</td>
                        <td data-label="Price">£{item.price}</td>
                        <td data-label="Quantity">
                            {!item.hasOwnProperty('stockQuantity') ? item.stockQuantity = 0 : ''}
                            <Quantity stockLevel={item.stockLevel}
                                      productId={item.id}
                                      itemPrice={item.price}
                                      stockQuantity={item.stockQuantity}
                                      item={item}
                            />
                        </td>
                        <td data-label="Cost" className="right">
                            £{(item.stockQuantity
                            ? (item.price * item.stockQuantity).toFixed(2)
                            : item.price)}
                        </td>
                        <td data-label="Remove" className="right">
                            <div className='delete-item'
                                 id={item.id}
                                 onClick={(event) =>
                                     deleteBasketItem(event.target.id)}>
                            </div>
                        </td>
                    </tr>
                })}
            </QuantityDispatch.Provider>
            <tr className="price-info spacer">
                <td scope="row" data-label="" className="left static-data">Subtotal
                    <div className="small-screen">
                        £{subTotal.toFixed(2)}
                    </div>
                </td>
                <td data-label=""></td>
                <td data-label=""></td>
                <td data-label=""
                    className="right static-data">£{subTotal.toFixed(2)}</td>
            </tr>
            <tr className="price-info">
                <td scope="row" data-label="" className="left">VAT at {VATPercentage}%
                    <div className="small-screen">
                        £{getVATPercentage(subTotal).toFixed(2)}
                    </div>
                </td>
                <td data-label=""></td>
                <td data-label=""></td>
                <td data-label="" className="right">£{getVATPercentage(subTotal).toFixed(2)}</td>
            </tr>
            <tr className="price-info">
                <td scope="row" data-label="" className="left bold">Total cost
                    <div className="small-screen bold">
                        £{(subTotal + getVATPercentage(subTotal)).toFixed(2)}
                    </div>
                </td>
                <td data-label=""></td>
                <td data-label=""></td>
                <td data-label="" className="right bold">£{(subTotal + getVATPercentage(subTotal)).toFixed(2)}</td>
            </tr>
            <tr className="price-info">
                <td scope="row" data-label="" className="left"></td>
                <td data-label=""></td>
                <td data-label=""></td>
                <td data-label="" className="right buy-now"><input type="button" value="BUY NOW"/></td>
            </tr>
            </tbody>
        </table>
    </>
}

export default Basket
