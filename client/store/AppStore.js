import {configureStore} from '@reduxjs/toolkit';
import orderReducer from './OrderReducer';
export default configureStore({
    reducer: {
        orderStore: orderReducer
    }
});
