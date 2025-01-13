import React, { useEffect, useState } from 'react'
import Navbar from './Header/Navbar'

function Home() {

  return (
    <div>
      <Navbar />
      <div className='mt-[100px] grid sm:grid-cols-2 gap-4' id='main-p'>
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