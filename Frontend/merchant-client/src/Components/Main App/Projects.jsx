import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddProject from '../Footer/AddProject'
import ProjectTable from './ProjectTable'
import { useSocket } from '../../SocketProvider'
import { toast } from 'react-toastify'

function Projects() {
    const socket = useSocket()
    const [projects, setProjects] = useState([])

    useEffect(() => {
        socket.connect()
    }, [])
    useEffect(() => {
        // give notification on new project added
        function eventOnNewProjectAdded(arg) {
            toast.info(arg, { position: 'top-center' })
        }
        function eventOnProjectRead(arg) {
            setProjects(arg)
        }
        // emit projects to the client
        socket.emit('show-client-project', "Requesting for project list")
        socket.on('on-project-added', eventOnNewProjectAdded)
        // todo: display project in realtime
        socket.on('show-project', eventOnProjectRead)
        return () => {
            socket.off('on-project-added', eventOnNewProjectAdded)
            socket.off('show-project', eventOnProjectRead)
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