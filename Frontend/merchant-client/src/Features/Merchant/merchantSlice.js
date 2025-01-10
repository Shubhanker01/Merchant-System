// importing create slice
import { createSlice } from '@reduxjs/toolkit'
import { registerUserEmail } from '../../Async logic/merchantThunk'
import { verifyUserEmail } from '../../Async logic/merchantThunk'
import { setPassword } from '../../Async logic/merchantThunk'
import { userLogin } from '../../Async logic/merchantThunk'

export const merchantSlice = createSlice({
    name: 'merchant',
    initialState: {
        username: '',
        email: '',
    },
    reducers: {
        setMerchant: (state, action) => {
            state.username = action.payload.username,
                state.email = action.payload.email
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserEmail.fulfilled, (state, action) => {

        }),
            builder.addCase(verifyUserEmail.fulfilled),
            builder.addCase(setPassword.fulfilled),
            builder.addCase(userLogin.fulfilled)
    }
})

export const { setMerchant } = merchantSlice.actions

export default merchantSlice.reducer
// export default merchantSlice.caseReducers