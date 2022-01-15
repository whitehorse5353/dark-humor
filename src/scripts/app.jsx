import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
