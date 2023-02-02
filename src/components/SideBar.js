import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import uniqid from "uniqid"

export default function SideBar({ changeTab, projects }) {

    const [projectsTitles, setProjectsTitles] = useState(projects)

    const handleStyle = (href) => {
        changeTab(href)
    }

    const projectsDisplay = projectsTitles.map(el => {
        return (
            <p key={uniqid()}>{el.title}</p>
        )
    })

    useEffect(() => {
        
        setProjectsTitles(projects)
    }, [projects])
 
    return (
        <div id="sidebar">

            <div>

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
            </div>

            <div>
                <p>Projects</p>
                <div id="projects-display">
                    {projectsDisplay}
                </div>
            </div>
        </div>
    )
}