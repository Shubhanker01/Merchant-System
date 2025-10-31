import React, { useState } from 'react'
import { addProject } from '../../Async logic/projectOperation'
import { toast } from 'react-toastify'
import { projectSocket } from '../../socket'
import getCookie from '../../utils/getCookie'
import decodeToken from '../../utils/decodeJwt'
function ProjectForm({ modal, openModal, projects, setProjects }) {
    const token = getCookie()
    const decodedToken = decodeToken(token)
    const [form, setForm] = useState({
        title: "",
        description: "",
        projectCreaterEmail: decodedToken.email,
        minPrice: 0,
        maxPrice: 0,
        deadline: ""
    })
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            let attachmentFile = document.getElementById('attachment')
            console.log(attachmentFile.files[0])
            // create a form data and append fields
            const formData = new FormData()
            formData.append('title', form.title)
            formData.append('description', form.description)
            formData.append('projectCreaterEmail', form.projectCreaterEmail)
            formData.append('minPrice', form.minPrice)
            formData.append('maxPrice', form.maxPrice)
            formData.append('deadline', form.deadline)
            formData.append('attachment', attachmentFile.files[0])
            let res = await addProject(formData, token)
            if (res !== undefined) {
                setForm({ ...form, title: "", description: "", minPrice: 0, maxPrice: 0, deadline: "" })
                openModal(!modal)
                projectSocket.emit('project-added', 'New project has been added')
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <div id="bids-modal" tabIndex="-1" className={`fixed ${modal == true ? `block` : `hidden`}  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
                <div className="relative p-4 w-[70%] max-h-full m-[0px_auto]">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add Project
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => { openModal(false) }}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form className="p-4 md:p-5" onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Add Title" required={true} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea name='description' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' cols='30' rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="minPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum Price</label>
                                    <input type='number' id='minPrice' name='minPrice' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='' value={form.minPrice} onChange={(e) => setForm({ ...form, minPrice: e.target.value })}></input>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="maxPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Price</label>
                                    <input type='number' id='maxPrice' name='maxPrice' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='' value={form.maxPrice} onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
                                    <input type='date' id='closing-date' name='deadline' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="attachment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attachment</label>
                                    <input type='file' id='attachment' name='attachment' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></input>
                                </div>
                            </div>

                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProjectForm