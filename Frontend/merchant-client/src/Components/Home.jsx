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
      <div id='bg-image'></div>
      <div className='absolute left-0 right-0 z-10 p-4 m-[50px_auto]' id='main-p'>
        <p className='text-slate-100 text-center text-2xl'>Our platform provides an efficient solution for managing merchants with ease. Whether you need to create, view, update, or delete merchant information, our system streamlines the process. Additionally, you can monitor and evaluate merchant bids, ensuring optimal decision-making and transparency. Simplify your business operations and stay in control with our powerful management tools.</p>
      </div>

    </div>
  )
}

export default Home