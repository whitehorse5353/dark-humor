import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './styles/App.css'
import Basket from "./components/Basket";
export const API_BASE_PATH = 'http://localhost:3001';
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
