// importing create slice
import { createSlice } from '@reduxjs/toolkit'
import { registerUserEmail } from '../../Async logic/merchantThunk'
import { verifyUserEmail } from '../../Async logic/merchantThunk'
import { setPassword } from '../../Async logic/merchantThunk'
import { userLogin } from '../../Async logic/merchantThunk'
import { toast } from 'react-toastify'
var id;

export const merchantSlice = createSlice({
    name: 'merchant',
    initialState: {
        email: '',
        username: ''
    },
    reducers: {
        setMerchant: (state, action) => {
            state.email = action.payload.email
            state.username = action.payload.username
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserEmail.fulfilled, (state, action) => {

        }),
            builder.addCase(verifyUserEmail.fulfilled),
            builder.addCase(setPassword.fulfilled),
            builder.addCase(userLogin.pending, () => {
                id = toast.loading("Please wait......", { position: 'top-center' })
            }),
            builder.addCase(userLogin.fulfilled, () => {
                toast.dismiss(id)
            })
    }
})

export const { setMerchant } = merchantSlice.actions

export default merchantSlice.reducer
// export default merchantSlice.caseReducers