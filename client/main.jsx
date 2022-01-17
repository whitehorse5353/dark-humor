import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store/AppStore'
import {QueryClient, QueryClientProvider} from 'react-query';
import App from './App'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <App/>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
)