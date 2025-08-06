import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddProject from '../Footer/AddProject'
import ProjectTable from './ProjectTable'
import { projectSocket } from '../../socket'
import { toast } from 'react-toastify'

function Projects() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        // connect to project socket to show updates regarding project
        projectSocket.connect()
        return () => {
            projectSocket.disconnect()
        }
    }, [])
    useEffect(() => {
        // give notification on new project added
        function eventOnNewProjectAdded(arg) {
            toast.info(arg, { position: 'top-center' })
        }
        function eventOnProjectRead(arg) {
            setProjects(arg)
        }
        projectSocket.on('on-project-added', eventOnNewProjectAdded)
        // todo: display project in realtime
        projectSocket.on('show-project', eventOnProjectRead)
        return () => {
            projectSocket.off('on-project-added', eventOnNewProjectAdded)
            projectSocket.off('show-project', eventOnProjectRead)
        }
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