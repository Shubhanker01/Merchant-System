import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setPassword } from '../../Async logic/merchantThunk'
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'

function PasswordSet() {
    const [progress, setProgress] = useState(0)
    const [password, setPasswordField] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = document.cookie.split('; ').find((row) => row.startsWith("token="))?.split("=")[1]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password != confPassword) {
            toast.error('Password does not match', { position: 'top-center' })
        }
        else {
            dispatch(setPassword({ password: password, token: token })).unwrap().then((res) => {
                toast.success(res, { position: 'top-center' })
                setProgress(80)
                setProgress(100)
                navigate('/login')
            }).catch((err) => {
                console.log(err)
            })
        }
        setPasswordField("")
        setConfPassword("")
    }


    return (
        <div className='bg-[#282A36] h-screen'>
            <LoadingBar color="#f11946" progress={progress}
                onLoaderFinished={() => setProgress(0)} height={3} />

            <h1 className='text-center text-[#F8F8F2] sm:text-2xl text-md pt-[30px] mb-[15px]'>This is last step. Please set your password to complete your registration</h1>
            <div className="w-[80%] bg-[#BD93F9] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 m-[0px_auto]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Set your password
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required={true} value={password} onChange={(e) => { setPasswordField(e.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="conf-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input type="password" name="conf-password" id="conf-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required={true} value={confPassword} onChange={(e) => { setConfPassword(e.target.value) }} />
                        </div>

                        <button type="submit" className="w-full text-gray-800 bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Continue</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default PasswordSet