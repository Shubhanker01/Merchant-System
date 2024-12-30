// importing create slice
import { createSlice } from '@reduxjs/toolkit'

export const merchantSlice = createSlice({
    name: 'merchant',
    initialState: {
        username: '',
        email: '',
    },
    reducers: {
        setMerchant: (state, action) => {
            state.username = action.payload.username,
            state.email = action.payload.email
        }
    }
})

export const { setMerchant } = merchantSlice.actions

export default merchantSlice.reducer