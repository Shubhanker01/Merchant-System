import { configureStore } from "@reduxjs/toolkit";

import merchantReducer from "./Features/Merchant/merchantSlice"
import bidsReducer from "./Features/Bids/bidsSlice"

export default configureStore({
    reducer: {
        merchant: merchantReducer,
        bids:bidsReducer
    }
})

