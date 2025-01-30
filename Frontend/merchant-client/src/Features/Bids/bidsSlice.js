import { createSlice } from "@reduxjs/toolkit";
import { showAllBids } from "../../Async logic/bidsThunk";
import { addBid } from "../../Async logic/bidsThunk";

export const bidsSlice = createSlice({
    name: 'bids',
    initialState: {
        bids: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(showAllBids.fulfilled, (state, action) => {
            state.bids = action.payload
        })
        builder.addCase(addBid.fulfilled, (state, action) => {

        })
    }
})

export const { addBids } = bidsSlice.actions
export default bidsSlice.reducer