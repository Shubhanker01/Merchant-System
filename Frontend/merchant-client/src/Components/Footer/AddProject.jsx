import React, { useState } from 'react'
import ProjectForm from '../Popup/ProjectForm';

function AddProject() {
    const [modal, openModal] = useState(false);
    return (
        <>
            <div className='fixed bottom-[20px] right-[20px] z-0'>
                <button className='m-4 bg-sky-950 rounded-md flex' onClick={() => { openModal(true) }}>
                    <svg className='m-2' width="24" height="24" viewBox="0 0 24 24" fill="#d5d9e8" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
                        <path d="M11.2502 6C11.2502 5.58579 11.586 5.25 12.0002 5.25C12.4145 5.25 12.7502 5.58579 12.7502 6V11.2502H18.0007C18.4149 11.2502 18.7507 11.586 18.7507 12.0002C18.7507 12.4145 18.4149 12.7502 18.0007 12.7502H12.7502V18.0007C12.7502 18.4149 12.4145 18.7507 12.0002 18.7507C11.586 18.7507 11.2502 18.4149 11.2502 18.0007V12.7502H6C5.58579 12.7502 5.25 12.4145 5.25 12.0002C5.25 11.586 5.58579 11.2502 6 11.2502H11.2502V6Z" fill="#d5d9e8" />
                    </svg>

                    <p className='hidden sm:block text-slate-100 font-medium m-2'>Add Project</p>
                </button>
            </div>
            <ProjectForm modal={modal} openModal={openModal} />
        </>
    )
}

export default AddProject