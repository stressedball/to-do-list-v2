import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import uniqid from 'uniqid'
export default function SideBar({ changeTab, projects, handleAppendTaskWrite }) {
    const [dragData, setDragData] = useState(null)
    const [projectsTitles, setProjectsTitles] = useState(projects)

    const handleStyle = (href) => { changeTab(href) }

    const handleDragEnter = (e) => {
        e.target.classList.add('highlight-box')
    }

    const handleDragLeave = (e) => {
        e.target.classList.remove('highlight-box')
    }

    const handleDragEnd = e => {
        handleAppendTaskWrite(dragData, e.target.parentElement.href.split('/').pop())
        setTimeout(() => {
            e.target.classList.remove('highlight-box')
        }, 100)
    }

    const handleDragEndRemove = (e) => {
        console.log(e.target)
        console.log(dragData)
    }

    useEffect(() => {
        const getObjectById = e => {
            setDragData(e.target.id)
        }
        window.addEventListener('dragstart', getObjectById)
        return () => window.removeEventListener('dragstart', getObjectById)
    }, [])

    const projectsDisplay = projectsTitles.map(el => {

        return (
            <Link
                onDragLeave={handleDragLeave}
                onDragEnter={handleDragEnter}
                onDragOver={e => e.preventDefault()}
                onDrop={handleDragEnd}
                className="links"
                to={`/${el.id}`}
                key={uniqid()}>
                <p
                    className="project-box"
                    key={uniqid()}
                    draggable='true'
                >{el.title}</p>
            </Link>
        )
    })

    useEffect(() => {

        setProjectsTitles(projects)
    }, [projects])

    return (
        <div id="sidebar">

            <div id="sidebar-nav">

                <Link className="links" to="/all-tasks">
                    <p
                        onClick={() => handleStyle("/all-tasks")}
                    >All tasks</p>
                </Link>

                <Link className="links" to="/week-tasks">
                    <p
                        onClick={() => handleStyle("/week-tasks")}
                    >Week's tasks</p>
                </Link >

                <Link className="links" to="/important-tasks">
                    <p
                        onClick={() => handleStyle("/important-tasks")}
                    >Important tasks</p>
                </Link >
                <Link className="links" to="/done-tasks">
                    <p
                        onClick={() => handleStyle("/done-tasks")}
                    >Done tasks</p>
                </Link >
            </div>

            <div>
                <div id="projects-display">
                    <p>Projects</p>
                    {projectsDisplay}
                </div>
                <div>
                    <img
                        src="./assets/wastebasket-svgrepo-com.svg" alt="trash-can"
                        style={{
                            width: '50px',
                            margin:'auto'
                        }}
                        onDragLeave={(e) => {
                            e.target.style.width = '50px'
                        }}
                        onDragEnter={e => {
                            e.target.style.width = '60px'
                        }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={handleDragEndRemove}
                    >
                    </img>
                </div>
            </div>
        </div>
    )
}