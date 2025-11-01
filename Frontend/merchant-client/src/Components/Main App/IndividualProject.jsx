import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Calendar, FileText, IndianRupee, ClipboardList } from "lucide-react"
import getCookie from '../../utils/getCookie'
import decodeToken from '../../utils/decodeJwt'
import ProjectBidForm from '../Popup/ProjectBidForm'

function IndividualProject() {
    const token = getCookie('token')
    const decodedToken = decodeToken(token)
    const location = useLocation()
    const project = location.state
    const { title, description, minPrice, maxPrice, deadline, attachments, projectCreaterEmail } = project
    const [modal, setModal] = useState(false)

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-5">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
                    {/* Header */}
                    <div className="border-b pb-4 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <ClipboardList className="text-blue-600" size={28} />
                            {title}
                        </h1>
                        <p className="text-gray-500 mt-1">Project Overview</p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-1 flex items-center gap-2">
                            <FileText className="text-gray-600" size={20} /> Description
                        </h2>
                        <p className="text-gray-600 leading-relaxed">{description || "No description provided."}</p>
                    </div>

                    {/* Price Section */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">Minimum Price</p>
                            <p className="text-xl font-semibold text-green-700 flex items-center gap-1">
                                <IndianRupee size={18} /> {minPrice?.toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">Maximum Price</p>
                            <p className="text-xl font-semibold text-red-700 flex items-center gap-1">
                                <IndianRupee size={18} /> {maxPrice?.toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="text-blue-600" size={22} />
                        <div>
                            <p className="text-sm text-gray-500">Deadline</p>
                            <p className="text-lg font-medium text-gray-800">
                                {new Date(deadline).toLocaleDateString("en-IN", {
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Attachment */}
                    {attachments && (
                        <div className="mt-6">
                            <a
                                href={attachments}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                            >
                                📎 View Attachment
                            </a>
                        </div>
                    )}
                    <div className='mt-6 '>
                        {
                            decodedToken.email !== projectCreaterEmail ?
                                <div>
                                    <button onClick={() => { setModal(!modal) }} className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition">
                                        Place a Bid
                                    </button>
                                </div> :
                                <div></div>
                        }
                    </div>
                </div>
            </div>
            <ProjectBidForm modal={modal} openModal={setModal} />
        </>
    )
}

export default IndividualProject