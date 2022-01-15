import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchOrdersByEmail = createAsyncThunk('search/fetchOrdersByEmail', async (user_email) => {
    return await fetch(
        `http://${import.meta.env.VITE_APP_BACKEND_HOST}:${import.meta.env.VITE_APP_BACKEND_PORT}/orders`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_email
            }),
        }
    )
        .then(res => res.json())
        .catch(error => console.log(error))
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {},
    reducers: {
        // since I have managed to apply state changes via extra-reducers, I don't really have any use case for the reducers
    },
    extraReducers: {
        [fetchOrdersByEmail.pending]: (state) => {
            return {
                ...state,
                isLoading: true
            };
        },
        [fetchOrdersByEmail.fulfilled]: (state, action) => {
            const {payload: {data}} = action;
            state = data; // this isn't really mutating the actual state since immer under the hood takes care of it to create immutable state
            return state;
        }
    }
});

export const {} = orderSlice.actions; // as mentioned above that's the same reason i am not exporting any custom reducers
export default orderSlice.reducer;
