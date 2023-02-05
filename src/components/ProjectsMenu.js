import { useSelector } from 'react-redux';
import ProjectMaker from "./ProjectMaker";
import uniqid from 'uniqid'

export default function ProjectsMenu({ changeTab }) {

    const items = useSelector(state => state.items);

    const projects = items.filter(el => el[1].tasks !== undefined)

    const projectsDisplay = projects.map(el => {

        return (
            <ProjectMaker
                project={el}
                key={uniqid()}
                changeTab={changeTab}
            />
        )
    })

    return (
        <div className="sidebar">
            <h3>Projects</h3>
            <div className='sidebar-nav'>
                {projectsDisplay}
            </div>
        </div>
    )
}

