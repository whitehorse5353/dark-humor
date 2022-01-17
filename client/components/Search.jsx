import React, {useEffect, useReducer, useState} from 'react'
import {useQuery} from 'react-query';
import Quantity from './Quantity';

export const QuantityDispatch = React.createContext(null);

const Basket = () => {

    const [basketState, setBasketState] = useState();
    const quantityReducer = (state, action) => {
        switch (action.type) {
            case 'QUANTITY_DECREASED':
                console.log('QUANTITY_DECREASED!!!');
                console.log(state, action);

                return {...state, ...{updatedQuantity: action.value, productId: action.productId}};
            case 'QUANTITY_INCREASED':
                console.log('QUANTITY_INCREASED!!!');
                console.log(state, action);
                return {...state, ...{updatedQuantity: action.value, productId: action.productId}};
            default:
                return state;
        }
    }

    const [quantityState, dispatch] = useReducer(quantityReducer, {});
    console.log(`quantityState`, quantityState);

    const deleteBasketItem = async (id) => {
        const deleteBasketRequest = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        await fetch(`http://localhost:3001/basket/${id}`, deleteBasketRequest).then(response =>
            response.json())
    }

    const {isLoading, error, data} = useQuery('basketItems', async () =>
        await fetch(`http://localhost:3001/basket`).then(response => response.json())
    );

    if (isLoading) {
        return <>Loading...</>;
    }

    if (error) {
        console.error(error);
    }

    const {basket} = data;
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
                <th scope="col" className="left">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col" className="right">Cost</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <QuantityDispatch.Provider value={dispatch}>
                {basket.map(item => {
                    console.log(`basketState`, basketState);
                    return <tr key={item.sku}>
                        <td data-label="" className="left">{`${item.name}, ${!item.size ? 'one size' : item.size}`}</td>
                        <td data-label="Price">£{item.price}</td>
                        <td data-label="Quantity">
                            <Quantity stockLevel={item.stockLevel}
                                      productId={item.id}
                                      itemPrice={item.price}
                                      basketState={basket}
                            />
                        </td>
                        <td data-label="Cost" className="right">
                            £{(item.id === quantityState.productId) && (item.price * quantityState.updatedQuantity)}
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
            <tr>
                <td scope="row" data-label="" className="left static-data">Subtotal</td>
                <td data-label=""></td>
                <td data-label=""></td>
                <td data-label="" className="right static-data">sub total sum</td>
            </tr>
            <tr>
                <td scope="row" data-label="" className="left">VAT at 20%</td>
                <td data-label=""></td>
                <td data-label=""></td>
                <td data-label="" className="right">collected vat %</td>
            </tr>
            <tr>
                <td scope="row" data-label="" className="left">Total cost</td>
                <td data-label=""></td>
                <td data-label=""></td>
                <td data-label="" className="right">total cost</td>
            </tr>
            <tr>
                <td scope="row" data-label="" className="left"></td>
                <td data-label=""></td>
                <td data-label=""></td>
                <td data-label="" className="right">total cost</td>
            </tr>
            </tbody>
        </table>
        {/*<div className="form">*/}
        {/*    <h3>*/}
        {/*        Please enter your email address to see your recent orders*/}
        {/*    </h3>*/}
        {/*    <label>Email</label>*/}
        {/*    <input type="text" id="email" onChange={({target: {value}}) => setEmail(value)}/>*/}
        {/*    <input type="button" className={`${!isValid && "disabled"}`} value="SEND"*/}
        {/*           disabled={!isValid}*/}
        {/*           onClick={switchView}/>*/}
        {/*</div>*/}
    </>
}

export default Basket
