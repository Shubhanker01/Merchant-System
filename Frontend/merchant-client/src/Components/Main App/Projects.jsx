import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddProject from '../Footer/AddProject'
import ProjectTable from './ProjectTable'
import { displayProjects } from '../../Async logic/projectOperation'

function Projects() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        async function displayAllProjects() {
            let data = await displayProjects()
            console.log(data)
            setProjects(data)
        }
        displayAllProjects()
    }, [])

    return (
        <>
            <NavbarApp />
            <div>
                <ProjectTable projects={projects} />
            </div>
            <AddProject projects={projects} setProjects={setProjects} />
        </>
    )
}

export default Projects