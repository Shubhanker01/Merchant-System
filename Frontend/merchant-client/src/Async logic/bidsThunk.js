import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../utils/getCookie";

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

export const addBid = createAsyncThunk(
    'bids/addbid',
    async function (obj, id) {
        try {
            let cookie = getCookie()
            let response = await axios.post('http://localhost:8000/api/bids/v1/addbid', {
                bidderId: id,
                title: obj.title,
                price: obj.price,
                openingDate: obj.openingDate,
                closingDate: obj.closingDate
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie}`
                }
            })
            let data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)