import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Basket from "./components/Basket";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Basket/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
