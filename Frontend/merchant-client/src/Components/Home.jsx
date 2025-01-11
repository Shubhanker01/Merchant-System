import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Home() {
  const [width, maxWidth] = useState(640)
  const [bar, setBar] = useState(false)
  useEffect(() => {
    if (window.innerWidth <= 640) {
      setBar(true)
    }
    else {
      setBar(false)
    }
  }, [])
  const handleShow = () => {

  }
  return (
    <div>
      <div className='bg-gray-800 grid grid-cols-2'>
        <div>
          <h1 className='text-gray-100 sm:text-3xl sm:p-4 text-md p-2'>Merchant Management System</h1>
        </div>
        {
          bar == true ?
            <div className='justify-self-end m-4' onClick={handleShow}>
              <div className='bg-slate-100 h-[2px] w-[20px] m-[5px]'></div>
              <div className='bg-slate-100 h-[2px] w-[20px] m-[5px]'></div>
              <div className='bg-slate-100 h-[2px] w-[20px] m-[5px]'></div>
            </div> :
            <div className='sm:justify-self-end sm:mt-4 sm:mr-4'>
              <Link to="/signup" className='text-gray-100 p-2 m-2 bg-orange-600 rounded-md'>SignUp</Link>
              <Link to="/login" className='text-gray-100 p-2 m-2 bg-orange-600 rounded-md'>LogIn</Link>
            </div>
        }


      </div>

      <div className='mt-[30px] grid sm:grid-cols-2 gap-4' id='main-p'>
        <div className='ml-4 mr-4'>
          <p className='text-slate-800 sm:text-left text-center sm:text-2xl text-md'>Our platform provides an efficient solution for managing merchants with ease. Whether you need to create, view, update, or delete merchant information, our system streamlines the process. Additionally, you can monitor and evaluate merchant bids, ensuring optimal decision-making and transparency. Simplify your business operations and stay in control with our powerful management tools.</p>
        </div>
        <div className='ml-4 mr-4'>
          <img src='https://images.unsplash.com/photo-1726137570707-0c03e2867b16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='rounded-md'></img>
        </div>
      </div>

    </div>
  )
}

export default Home