import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const registerUserEmail = createAsyncThunk(
    'register/email',
    async (name, email) => {
        try {
            let response = await axios.post('api/merchant/registration', {
                name: name,
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.data
            return data
        } catch (error) {
            console.log(error.message)
        }
    }
)