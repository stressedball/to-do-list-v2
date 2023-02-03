import { useEffect, useState } from "react"

export default function AddProject({ setSelectedOption, addProject }) {

    const [newProject, setNewProject] = useState('')

    const handleChange = (e) => { setNewProject(e.target.value) }

    const handleClick = () => {
        if (newProject === '') {
            alert('please enter a project')
            return
        }

        const projectToAdd = { title: newProject }
        addProject(projectToAdd)
    }

    return (
        <div className="make project">

            <div className="horizontal">
                <p>Enter a new Project</p>

                <input value={newProject}
                    onChange={handleChange}
                    placeholder="Build your dream project"
                ></input>

                <button onClick={handleClick}>Add Project</button>
            </div>

            <p>You can append any task to your project by dragging the task and dropping it to the Project once created.</p>

            <button className="make-switcher" onClick={() => setSelectedOption('AddTask')}>Switch to Tasks</button>

        </div>
    )
}

