import { createSlice } from "@reduxjs/toolkit";

export const bidsSlice = createSlice({
    name: 'bids',
    initialState: [
        {
            id: 1,
            bidderName: 'bidder 1',
            title: 'Auction on building',
            price: 'Rs 101',
            openingDate: '10-11-2025',
            closingDate: '10-11-2026'
        }
    ],
    reducers: {
        addBids: (state, action) => {
            state.push(action.payload)
        }
    }
})

export default bidsSlice.reducer