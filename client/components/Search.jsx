import React, {useEffect, useReducer, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useQuery} from 'react-query';
import Quantity from './Quantity';

const QuantityDispatch = React.createContext(null);

const Basket = () => {

    const quantityReducer = (state, action) => {
        switch (action.type) {
            case "BUTTON_CLICKED":
                //action.state      // like this
                return [...state, "goodbye"];
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(quantityReducer, store);

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
                    return <tr key={item.sku}>
                        <td data-label="" className="left">{`${item.name}, ${!item.size ? 'one size' : item.size}`}</td>
                        <td data-label="Price">{item.price}</td>
                        <td data-label="Quantity"><Quantity stockLevel={item.stockLevel} productId={item.id}/></td>
                        <td data-label="Cost" className="right"></td>
                        <td data-label="Remove" className="right">
                            <div className='delete-item'
                                 id={item.id}
                                 onClick={(event) => console.log(event.target.id)}></div>
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
