import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className='bg-gray-800 grid grid-cols-2'>
        <div>
          <h1 className='text-gray-100 text-3xl p-4'>Merchant Management System</h1>
        </div>
        <div className='justify-self-end mt-4 mr-4'>
          <Link to="/signup" className='text-gray-100 p-2 m-2 bg-orange-600 rounded-md'>SignUp</Link>
          <Link to="/login" className='text-gray-100 p-2 m-2 bg-orange-600 rounded-md'>LogIn</Link>
        </div>

      </div>

      <div className='h-[400px] w-[90%]'>
        <p>Our platform provides an efficient solution for managing merchants with ease. Whether you need to create, view, update, or delete merchant information, our system streamlines the process. Additionally, you can monitor and evaluate merchant bids, ensuring optimal decision-making and transparency. Simplify your business operations and stay in control with our powerful management tools.</p>
      </div>
      <div className='w-[90%] m-[auto]'>
        <img src="https://images.unsplash.com/photo-1726137570707-0c03e2867b16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='' />
      </div>

    </div>
  )
}

export default Home