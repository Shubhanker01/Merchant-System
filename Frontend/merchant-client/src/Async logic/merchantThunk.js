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
            return data
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
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const setPassword = createAsyncThunk(
    'password/set',
    async ({ password, token }) => {
        try {
            let response = await axios.post('http://localhost:8000/api/merchant/setpassword', {
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            let data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)