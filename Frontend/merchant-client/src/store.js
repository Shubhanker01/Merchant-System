import { configureStore } from "@reduxjs/toolkit";

import merchantReducer from "./Features/Merchant/merchantSlice"

export default configureStore({
    reducer: {
        merchant: merchantReducer
    }
})

