import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Basket from "./components/Search";
import Orders from "./components/Orders";
import OrderDetail from "./components/OrderDetail";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/orders/:user_email' element={<Orders/>}/>
                    <Route path='/orderDetail/:tracking_number' element={<OrderDetail/>}/>
                    <Route path='/' element={<Basket/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
