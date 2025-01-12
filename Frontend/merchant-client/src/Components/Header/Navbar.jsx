import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [show, setShow] = useState(false)
    
    const handleShow = () => {
        if (show) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }
    return (
        <div>
            <div className='bg-gray-800 w-full fixed top-[-5px] grid grid-cols-2 z-20'>
                <div>
                    <h1 className='text-gray-100 sm:text-3xl sm:p-4 text-md p-2'>Merchant Management System</h1>
                </div>
                {
                    window.innerWidth <= 640 ?
                        <button className='group justify-self-end mr-4' onClick={handleShow}>
                            <div className='bg-slate-100 h-[2px] w-[20px] m-[5px] transition group-focus:rotate-45 group-focus:translate-y-2.5'></div>
                            <div className='bg-slate-100 h-[2px] w-[20px] m-[5px]group-focus:translate-x-0'></div>
                            <div className='bg-slate-100 h-[2px] w-[20px] m-[5px]group-focus:-rotate-45 group-focus:-translate-y-2.5'></div>
                        </button> :
                        <div className='sm:justify-self-end sm:mt-4 sm:mr-4'>
                            <Link to="/signup" className='text-gray-100 p-2 m-2 bg-orange-600 rounded-md'>SignUp</Link>
                            <Link to="/login" className='text-gray-100 p-2 m-2 bg-orange-600 rounded-md'>LogIn</Link>
                        </div>
                }
            </div>
            {
                show == false ?
                    <div></div> :
                    <div className='h-[100px] w-full bg-gray-800 fixed top-[40px] z-10 transition duration-500 ease-in-out'>
                        <ul>
                            <li className='text-center p-4'><Link to="/signup" className='text-gray-100 p-2 m-2'>SignUp</Link></li>
                            <li className='text-center p-4'><Link to="/login" className='text-gray-100 p-2 m-2'>LogIn</Link></li>
                        </ul>
                    </div>
            }
        </div>
    )
}

export default Navbar