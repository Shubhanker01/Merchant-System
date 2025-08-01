import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../Async logic/merchantThunk'
import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import { setMerchant } from '../../Features/Merchant/merchantSlice'

function Login() {
  let [progress, setProgress] = useState(0)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(userLogin({ email: email, password: password })).unwrap().then((res) => {
      if (res != undefined) {
        dispatch(setMerchant({ email: email, username: res.username }))
        setProgress(60)
        toast.success(res.message, { position: 'top-center' })
        setProgress(100)
        navigate(`/main-app/${res.userId}`)
      }

    }).catch((err) => {
      console.log(err)
    })
    setEmail("")
    setPassword("")
  }
  return (
    <>
      <LoadingBar color="#f11946" progress={progress}
        onLoaderFinished={() => setProgress(100)} height={3} />
      <div className='h-screen bg-[#282A36]'>
      <div className="w-[80%] bg-[#BD93F9] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 m-[0px_auto] pt-[30px]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 pt-[30px]">
          <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} value={email} onChange={e => { setEmail(e.target.value) }} />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required={true} value={password} onChange={e => { setPassword(e.target.value) }} />
            </div>
            <button type="submit" className="w-full text-gray-800 bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Forgot your password? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Click here</Link>
            </p>
          </form>
        </div>
      </div>
      </div>
    </>

  )
}

export default Login