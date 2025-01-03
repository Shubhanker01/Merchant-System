import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const registerUserEmail = createAsyncThunk(
    'register/email',
    async ({ name, email }) => {
        try {
            let response = await axios.post('http://localhost:8000/api/merchant/registration', {
                name: name,
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.data
            return { message: data, status: response.status }
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const verifyUserEmail = createAsyncThunk(
    'verify/email',
    async ({ email, otp }) => {
        try {
            let response = await axios.post('http://localhost:8000/api/merchant/verify', {
                email: email,
                otp: otp
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.data
            return { message: data, status: response.status }
        } catch (error) {
            console.log(error.message)
        }
    }
)