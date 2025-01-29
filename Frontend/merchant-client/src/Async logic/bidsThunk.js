import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const showAllBids = createAsyncThunk(
    'bids/showallbids',
    async function () {
        try {
            let response = await axios.get('http://localhost:8000/api/bids/v1/showallbids')
            let data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)