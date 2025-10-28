import React from 'react'
import IndividualProject from './IndividualProject'
import { Link, useParams } from 'react-router-dom'

function ProjectTable({ projects }) {
    const { userId } = useParams()
    if (projects.length == 0) {
        return <h1>No Projects to Display</h1>
    }
    return (
        <>
            <div className="overflow-x-auto p-4 mt-[80px]">
                <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Min Price</th>
                            <th className="px-4 py-2 text-left">Max Price</th>
                            <th className="px-4 py-2 text-left">Deadline</th>
                            <th className="px-4 py-2 text-left">PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id} className="border-b hover:bg-gray-100 transition duration-150">
                                <td className="px-4 py-2">{project.title}</td>
                                <td className="px-4 py-2">{project.description}</td>
                                <td className="px-4 py-2">₹{project.minPrice}</td>
                                <td className="px-4 py-2">₹{project.maxPrice}</td>
                                <td className="px-4 py-2">
                                    {new Date(project.deadline).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 text-blue-600 underline">
                                    <a href={project.attachments} target="_blank" rel="noopener noreferrer">
                                        View PDF
                                    </a>
                                </td>
                                <td className='px-4 py-2 text-blue-600 underline'>
                                    <Link to={`/main-app/${userId}/projects/${project._id}`} state={project}>Individual Project</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProjectTable