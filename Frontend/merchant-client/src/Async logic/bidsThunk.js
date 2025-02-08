import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../utils/getCookie";


export const showAllBids = createAsyncThunk(
    'bids/showallbids',
    async function () {
        try {
            let response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/bids/v1/showallbids`)
            let data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const addBid = createAsyncThunk(
    'bids/addbid',
    async function (obj) {
        try {
            let cookie = getCookie()
            let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/bids/v1/addbid`, {
                title: obj.title,
                price: `Rs ${String(obj.price)}`,
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