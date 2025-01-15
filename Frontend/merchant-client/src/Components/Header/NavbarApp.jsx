import React, { useState } from 'react'

function NavbarApp() {
    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        if (toggle == false) {
            setToggle(true)
            document.querySelector('#navBtn').classList.add('close')
        }
        else {
            setToggle(false)
            document.querySelector('#navBtn').classList.remove('close')
        }
    }
    return (
        <div>
            <div className='fixed w-full'>
                {/* Navbar */}
                <nav className="bg-slate-900 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className='flex items-center'>
                            <img width="48" height="48" src="https://img.icons8.com/color/48/bid.png" alt="bid" />
                            <h1 className="text-white font-bold sm:text-2xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer text-base">Merchant Management System </h1>
                        </div>

                        {/* Hamburger menu for small screens */}
                        <div className="lg:hidden">
                            <button className="text-white focus:outline-none" id='navBtn' onClick={handleToggle}>
                                <div className='btn-line'></div>
                                <div className='btn-line'></div>
                                <div className='btn-line'></div>
                            </button>
                        </div>

                        {/* Navigation links */}
                        {
                            toggle == false ?
                                <div className='hidden sm:flex lg:space-x-4 lg:mt-0 mt-4 items-center text-xl'>
                                    <a href="/" className="text-white text-base px-4 py-2 hover:text-orange-600 ">Home</a>
                                    <a href="#Projects" className="text-white text-base  px-4 py-2  hover:text-orange-600">Message</a>
                                    <a href="/" className="text-white text-base  px-4 py-2  hover:text-orange-600">About</a>
                                    <a href="/" className="text-white text-base  px-4 py-2  hover:text-orange-600">Contact Me</a>
                                    <button className='text-slate-100 bg-orange-600 rounded-md text-base p-2'>Logout</button>
                                </div> :
                                <div className='fixed w-full h-full z-10 bg-slate-900 transition duration-500 delay-150 ease-in-out top-[40px]'>
                                    <a href="/" className="text-white text-base px-4 py-2 hover:text-orange-600 ">Home</a>
                                    <a href="#Projects" className="text-white text-base  px-4 py-2  hover:text-orange-600">Message</a>
                                    <a href="/" className="text-white text-base  px-4 py-2  hover:text-orange-600">About</a>
                                    <a href="/" className="text-white text-base  px-4 py-2  hover:text-orange-600">Contact Me</a>
                                    <button className='text-slate-100 bg-orange-600 rounded-md text-base p-2'>Logout</button>
                                </div>
                        }

                    </div>

                </nav>


            </div>

        </div>
    )
}

export default NavbarApp