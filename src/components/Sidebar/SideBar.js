import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import ProjectMaker from "./ProjectMaker";

export default function SideBar({ changeTab }) {

    const items = useSelector(state => state.items);

    const handleStyle = (val) => { changeTab(val) }

    const projects = items.filter(el => el[1].tasks !== undefined)

    const projectsDisplay = projects.map(el => {
        return (
            <ProjectMaker
                project={el}
                changeTab={changeTab}
            />
        )
    })

    return (
        <div id="sidebar">
            <header>
                <h3>To Do Project</h3>
            </header>

            <div id="sidebar-nav">

                <Link className="links" to="/">
                    <p
                        onClick={() => handleStyle("/")}
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
                    <h3>Projects</h3>
                    {projectsDisplay}
                </div>
            </div>
        </div>
    )
}