import React from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddProject from '../Footer/AddProject'
import ProjectTable from './ProjectTable'
function Projects() {
    
    const sampleProjects = [
        {
            title: 'E-commerce Site',
            description: 'Build a React frontend for an e-commerce platform.',
            minPrice: 10000,
            maxPrice: 25000,
            deadline: '2025-08-10T00:00:00Z',
            url: 'https://example.com/proposal1.pdf',
        },
        {
            title: 'Logo Design',
            description: 'Design a professional logo for a startup.',
            minPrice: 2000,
            maxPrice: 5000,
            deadline: '2025-08-15T00:00:00Z',
            url: 'https://example.com/logo-proposal.pdf',
        },
    ]
    return (
        <>
            <NavbarApp />
            <div>
                <ProjectTable projects={sampleProjects} />
            </div>
            <AddProject />
        </>
    )
}

export default Projects