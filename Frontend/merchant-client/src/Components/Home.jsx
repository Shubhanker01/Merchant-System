import React, { useEffect, useState } from 'react'
import Navbar from './Header/Navbar'

function Home() {

  return (
    <div>
      <Navbar />
      <div className='pt-[100px] bg-gray-700' id='main-p'>
        <div className='m-4'>
          <p className='text-slate-200 text-center sm:text-2xl text-md'>Our platform provides an efficient solution for managing merchants with ease. Whether you need to create, view, update, or delete merchant information, our system streamlines the process. Additionally, you can monitor and evaluate merchant bids, ensuring optimal decision-making and transparency. Simplify your business operations and stay in control with our powerful management tools.</p>
        </div>
        <div className='m-[0px_auto] w-[75%]'>
          <img src='https://images.unsplash.com/photo-1726137570707-0c03e2867b16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='rounded-md p-8'></img>
        </div>
      </div>
      <div className='bg-[url("https://images.unsplash.com/photo-1665652475985-37e285aeff53?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-no-repeat w-full bg-cover'>
        <h1 className='text-3xl font-bold text-slate-200 ml-16 pt-16 w-[40%]'>Bring your people, workflow and processes together</h1>
        <p className='text-2xl text-slate-200 ml-16 pt-8'>Chat with different poeple and establish a successfull bidding process</p>
        <div className='mt-16 grid grid-cols-1 justify-items-center h-full'>
          <div className='bg-gradient-to-r from-[#242124] to-[#003366] bg-no-repeat rounded-md grid grid-cols-2 gap-2 w-[80%] ml-8 h-[250px]'>
            <div>
              <h1 className='text-4xl font-bold text-slate-200 ml-8 pt-4'>Plan</h1>
              <p className='text-slate-200 text-3xl ml-8 pt-4'>Get complete oversight of your opportunity pipeline to prepare, prioritise and manage resources.</p>
            </div>
            <div className='h-[80%] m-[10px_auto]'>
              <img src="https://images.unsplash.com/photo-1707761918029-1295034aa31e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='h-[200px]' alt="" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home