import React, { useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Logout from '../Popup/Logout'

function NavbarApp() {
    let { userId } = useParams()
    const [toggle, setToggle] = useState(false)
    const [modal, setModal] = useState(false)
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
    const openLogoutModal = () => {
        if (!modal) {
            setModal(true)
        }
        else {
            setModal(false)
        }
    }
    return (
        <>

            <div>
                <div className='fixed w-full z-10 top-[-10px]'>
                    {/* Navbar */}
                    <nav className="bg-slate-900 p-4">
                        <div className="container mx-auto flex justify-between items-center">
                            <div className='flex items-center'>
                                <img className='' src="https://img.icons8.com/color/48/bid.png" alt="bid" />
                                <h1 className="text-white font-bold sm:text-2xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer text-base self-center pt-[5px]">Merchant Management System </h1>
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
                                        <NavLink to={`/main-app/${userId}`} className={`text-white text-base px-4 py-2 hover:text-orange-600 `}>Home</NavLink>
                                        <NavLink to={`/main-app/${userId}/message`} className="text-white text-base  px-4 py-2  hover:text-orange-600">Message</NavLink>
                                        <NavLink to={`/main-app/${userId}/mybids`} className='text-white text-base  px-4 py-2  hover:text-orange-600'>My Bids</NavLink>
                                        <NavLink to={`/main-app/${userId}/projects`} className='text-white text-base px-4 py-2 hover:text-orange-600'>Projects</NavLink>
                                        {/* <NavLink to="/about" className="text-white text-base  px-4 py-2  hover:text-orange-600">About</NavLink>
                                        <NavLink to="/contact" className="text-white text-base  px-4 py-2  hover:text-orange-600">Contact Me</NavLink> */}
                                        <button className='text-slate-100 bg-orange-600 rounded-md text-base p-2' onClick={openLogoutModal}>Logout</button>
                                    </div> :
                                    <div className='fixed z-10 flex flex-col w-[104%] h-full z-10 bg-slate-900 transition duration-500 delay-150 ease-in-out top-[70px] left-[-10px]'>
                                        <NavLink to={`/main-app/${userId}`} className="text-white text-base px-4 py-2 hover:text-orange-600 self-center">Home</NavLink>
                                        <NavLink to={`/main-app/${userId}/message`} className="text-white text-base  px-4 py-2  hover:text-orange-600 self-center">Message</NavLink>
                                        <NavLink to={`/main-app/${userId}/mybids`} className='text-white text-base  px-4 py-2  hover:text-orange-600 self-center'>My Bids</NavLink>
                                        <NavLink to={`/main-app/${userId}/projects`} className='text-white text-base  px-4 py-2  hover:text-orange-600 self-center'>Projects</NavLink>
                                        {/* <NavLink to="/about" className="text-white text-base  px-4 py-2  hover:text-orange-600 self-center">About</NavLink>
                                        <NavLink to="/contact" className="text-white text-base  px-4 py-2  hover:text-orange-600 self-center">Contact Me</NavLink> */}
                                        <button className='text-slate-100 bg-orange-600 rounded-md text-base p-2 self-center' onClick={openLogoutModal}>Logout</button>
                                    </div>
                            }

                        </div>

                    </nav>


                </div>

            </div>
            <Logout setModal={setModal} modal={modal} />
        </>
    )
}

export default NavbarApp