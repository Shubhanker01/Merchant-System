import React from 'react'

function NavbarApp() {
    return (
        <div>
            <div className='fixed w-full'>
                {/* Navbar */}
                <nav className="bg-slate-900 p-4">
                    <div className="container mx-auto flex flex-col  justify-between items-center">
                        <div className='flex items-center'>
                            <img width="48" height="48" src="https://img.icons8.com/color/48/bid.png" alt="bid" />
                            <h1 className="text-white font-bold sm:text-2xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer text-base">Merchant Management System </h1>
                        </div>

                        {/* Hamburger menu for small screens */}
                        <div className="lg:hidden">
                            <button className="text-white focus:outline-none" id='navBtn'>
                                <div className='btn-line'></div>
                                <div className='btn-line'></div>
                                <div className='btn-line'></div>
                            </button>
                        </div>

                        {/* Navigation links */}
                        <div className={`lg:flex flex-col lg:flex-row lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl`}>
                            <a href="/" className="text-white text-base px-4 py-2 hover:text-orange-600 ">Home</a>
                            <a href="#Projects" className="text-white text-base  px-4 py-2  hover:text-orange-600">Message</a>
                            <a href="/" className="text-white text-base  px-4 py-2  hover:text-orange-600">About</a>
                            <a href="/" className="text-white text-base  px-4 py-2  hover:text-orange-600">Contact Me</a>
                            <button className='text-slate-100 bg-orange-600 rounded-md text-base p-2'>Logout</button>
                        </div>
                    </div>

                </nav>


            </div>

        </div>
    )
}

export default NavbarApp