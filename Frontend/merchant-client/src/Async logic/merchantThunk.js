import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";

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
            toast.error(error.response.data, { position: 'top-center' })
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
            document.cookie = `token=${data.token}; SameSite=None; Secure`
            return data.message
        } catch (error) {
            toast.error(error.response.data, { position: 'top-center' })
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
            toast.error(error.response.data, { position: 'top-center' })
        }
    }
)

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }) => {
        try {
            let response = await axios.post('http://localhost:8000/api/merchants/login', {
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.data
            document.cookie = `token=${data.token}; SameSite=None; Secure`
            return data.message
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data, { position: 'top-center' })
        }
    }
)