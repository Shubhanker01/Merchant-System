import React, { useEffect, useState } from 'react'
import Navbar from './Header/Navbar'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div>
      <Navbar />
      <div className='pt-[100px] bg-gray-700' id='main-p'>
        <div className='m-4'>
          <p className='text-slate-200 text-center sm:text-2xl text-md'>Our platform provides an efficient solution for managing merchants with ease. Whether you need to create, view, update, or delete merchant information, our system streamlines the process. Additionally, you can monitor and evaluate merchant bids, ensuring optimal decision-making and transparency. Simplify your business operations and stay in control with our powerful management tools.</p>
        </div>
        <div className='m-[0px_auto] sm:w-[75%] w-[90%]'>
          <img src='https://images.unsplash.com/photo-1726137570707-0c03e2867b16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='rounded-md p-8'></img>
        </div>
      </div>
      <div className='bg-[url("https://images.unsplash.com/photo-1665652475985-37e285aeff53?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-no-repeat w-full bg-cover pb-8'>
        <h1 className='sm:text-3xl text-xl font-bold text-slate-200 ml-16 pt-16 sm:w-[40%] w-[70%]'>Bring your people, workflow and processes together</h1>
        <p className='sm:text-2xl text-md text-slate-200 ml-16 pt-8'>Chat with different poeple and establish a successfull bidding process</p>
        <div className='mt-16 grid grid-cols-1 justify-items-center h-full'>
          <div className='bg-gradient-to-r from-[#242124] to-[#003366] bg-no-repeat rounded-md grid sm:grid-cols-2 grid-cols-1 gap-2 w-[80%] ml-8 mt-4 sm:h-[250px] h-[300px]'>
            <div>
              <h1 className='sm:text-4xl text-xl font-bold text-slate-200 ml-8 pt-4'>Plan</h1>
              <p className='text-slate-200 sm:text-3xl text-md ml-8 pt-4'>Get complete oversight of your opportunity pipeline to prepare, prioritise and manage resources.</p>
            </div>
            <div className='h-[80%] ml-8 sm:my-auto'>
              <img src="https://images.unsplash.com/photo-1707761918029-1295034aa31e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='sm:h-[200px] w-[80%]' alt="" />
            </div>

          </div>

          <div className='bg-gradient-to-r from-[#242124] to-[#003366] bg-no-repeat rounded-md grid sm:grid-cols-2 grid-cols-1 gap-2 w-[80%] ml-8 mt-4 sm:h-[250px] h-[300px]'>
            <div>
              <h1 className='sm:text-4xl text-xl font-bold text-slate-200 ml-8 pt-4'>Manage</h1>
              <p className='text-slate-200 sm:text-3xl text-md ml-8 pt-4'>Improve bid outcomes with an unmatched level of coordination, control, consistency and compliance.</p>
            </div>
            <div className='h-[80%] ml-8 sm:my-auto'>
              <img src="https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=857&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='sm:h-[200px] w-[80%]' alt="" />
            </div>

          </div>

          <div className='bg-gradient-to-r from-[#242124] to-[#003366] bg-no-repeat rounded-md grid sm:grid-cols-2 grid-cols-1 gap-2 w-[80%] ml-8 mt-4 sm:h-[250px] h-[300px]'>
            <div>
              <h1 className='sm:text-4xl text-xl font-bold text-slate-200 ml-8 pt-4'>Track</h1>
              <p className='text-slate-200 sm:text-3xl text-md ml-8 pt-4'>Get a full overview of bid status at any phase or stage to proactively manage risks.</p>
            </div>
            <div className='h-[80%] ml-8 sm:my-auto'>
              <img src="https://images.unsplash.com/photo-1711097383282-28097ae16b1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='md:h-[200px] w-[80%]' alt="" />
            </div>

          </div>
        </div>
      </div>
      <div className='bg-gray-800 pl-8 pt-8'>
        <h1 className='text-slate-200'>Who We Are</h1>
        <div className='h-[3px] w-[105px] bg-orange-500'></div>
        <div className='mt-4 pb-4'>
          <ul className='text-slate-200'>
            <li><Link>About Us</Link></li>
            <li><Link>Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home