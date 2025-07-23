import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { verifyUserEmail } from '../../Async logic/merchantThunk'
import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'

function EmailVerification() {
    const [progress,setProgress] = useState(0)
    let [email, setEmail] = useState("")
    let [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const verifyEmail = (e) => {
        e.preventDefault()
        dispatch(verifyUserEmail({ email: email, otp: otp })).unwrap().then((response) => {
            if (response != undefined) {
                setProgress(80)
                toast.success(response, { position: 'top-center' })
                navigate('/signup/password-set')
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <>
            <LoadingBar color='#f11946' progress={progress} height={3} onLoaderFinished={() => setProgress(0)} />
            <div className='bg-[#282A36] h-screen'>
                <h1 className='text-center text-[#F8F8F2] sm:text-2xl text-md pt-[30px] mb-[15px]'>This is Step 2 of 3. Enter the OTP that has been sent to your email</h1>
                <div className="w-[80%] bg-[#BD93F9] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 m-[0px_auto]">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Verify your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={verifyEmail}>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required={true} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
                                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required={true} value={otp} onChange={(e) => { setOtp(e.target.value) }} />
                            </div>

                            <button type="submit" className="w-full text-gray-800 bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Verify account</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailVerification