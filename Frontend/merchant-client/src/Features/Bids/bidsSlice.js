import { createSlice } from "@reduxjs/toolkit";
import { showAllBids } from "../../Async logic/bidsThunk";

export const bidsSlice = createSlice({
    name: 'bids',
    initialState: [],
    reducers: {
        addBids: (state, action) => {
            state.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(showAllBids.fulfilled, (state, action) => {
            state = action.payload
        })
    }
})

export const { addBids } = bidsSlice.actions
export default bidsSlice.reducer