import { useState } from "react"
import { useDispatch } from "react-redux";

export default function AddProject({ setSelectedOption }) {

    const dispatch = useDispatch()

    const [newProject, setNewProject] = useState('')

    const handleChange = (e) => { setNewProject(e.target.value) }

    const handleClick = () => {
        if (newProject === '') {
            alert('please enter a project')
            return
        }

        const projectToAdd = { title: newProject, tasks: [] }

        dispatch({ type: 'ADD_PROJECT', item: projectToAdd })
    }

    return (
        <div className="make project">

            <div className="container">

                <div className="horizontal">
                
                    <input
                        id="project-title"
                        value={newProject}
                        onChange={handleChange}
                        placeholder="Build your dream project"
                    ></input>
                
                    <button
                        onClick={handleClick}
                    >Add Project</button>
                </div>

                <p>You can append any task to your project by dragging the task and dropping it to the project.</p>
            </div>

            <button
                className="make-switcher"
                onClick={() => setSelectedOption('AddTask')}
            >Switch to Tasks</button>

        </div>
    )
}

