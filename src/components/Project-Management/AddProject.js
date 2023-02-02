import { useEffect, useState } from "react"

export default function AddProject({ setSelectedOption, tasks, addProject }) {
    const [newProject, setNewProject] = useState('')
    const [matchingTasks, setMatchingTasks] = useState([])

    const handleChange = (e) => { setNewProject(e.target.value) }

    const handleClick = () => {
        if (newProject === '') {
            alert('please enter a project')
            return
        }

        const projectToAdd = { title: newProject }
        addProject(projectToAdd)
    }

    const handleSearch = (e) => {
        tasks.filter(task => {
            if (task.title.includes(e.target.value)) {
                setMatchingTasks([...matchingTasks, task])
            }
        })
    }

    useEffect(() => {
        // setMatchingTasks([])
    }, [matchingTasks])
    console.log(newProject)
    return (
        <div>
            <div style={{
                display: "flex"
            }}>
                <p>Enter a new Project</p>
                <input value={newProject}
                    onChange={handleChange}
                    placeholder="Build your dream project"
                ></input>
                <button onClick={handleClick}>Add Project</button>
            </div>
            <div>
                <p>Search for a task to append it to your Project</p>
                <input id="task-search" type="text" onChange={handleSearch}></input>
            </div>
            <button className="make-switcher" onClick={() => setSelectedOption('AddTask')}>Switch to Tasks</button>
        </div>
    )
}