import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setMerchant } from '../../Features/Merchant/merchantSlice'
import { registerUserEmail } from '../../Async logic/merchantThunk'
import { toast } from 'react-toastify'
function Signup() {
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let merchant = useSelector(state => state.merchant)
    let dispatch = useDispatch()
    const addMerchant = async (e) => {
        e.preventDefault()
        let response = await dispatch(registerUserEmail(username,email))
        toast(response, { position: 'top-center', className: 'bg-sky-950 text-slate-100' })
        setUsername("")
        setEmail("")
    }

    return (
        <>
            <div>
                <h1 className='text-center text-4xl text-bold'>Signup page</h1>
            </div>
            <h1 className='text-center text-2xl mt-[30px] mb-[15px]'>This is Step 1 of 3. Enter your email and verify your account to register</h1>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 m-[0px_auto]">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form class="space-y-4 md:space-y-6" onSubmit={addMerchant}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                            <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required={true} value={username} onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required={true} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>

                        <button type="submit" class="w-full text-gray-800 bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Verify account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup