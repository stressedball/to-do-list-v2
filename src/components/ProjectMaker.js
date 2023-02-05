import { useState, useEffect } from "react"
import uniqid from 'uniqid'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"

export default function ProjectMaker({ project, changeTab }) {

    const projectId = project[0]
    const [projectText, setProjectText] = useState(project[1].title)
    const [dragData, setDragData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [projectTasksRemove, setProjectTasksRemove] = useState(false)

    const dispatch = useDispatch()

    const handleSaveEdit = e => {
        setIsEdit(false)
        dispatch({
            type: 'TITLE_EDIT',
            id: e.target.id,
            value: e.target.value
        })
    }

    const handleDragEnter = (e) => {
        e.target.classList.add('highlight-box')
    }

    const handleDragLeave = (e) => {
        e.target.classList.remove('highlight-box')
    }

    const handleDragEnd = e => {
        const id = e.target.parentElement.href.split('/').pop()
        dispatch({ type: 'TASK_APPEND', id: id, task: dragData })
        setTimeout(() => {
            e.target.classList.remove('highlight-box')
        }, 100)
    }

    const handleRemove = e => {
        if (project[1].tasks.length === 0) {
            changeTab('/all-tasks', 'links')
            // you don't want it crashing right?
            setTimeout(() => {
                dispatch({
                    type: 'ID_REMOVE',
                    id: e.target.id
                })
            })
        } else {
            setProjectTasksRemove(true)
        }
    }

    const removePrompt = () => { setProjectTasksRemove(false) }

    useEffect(() => {
        const getObjectById = e => {
            setDragData(e.target.id)
        }
        window.addEventListener('dragstart', getObjectById)
        return () => { window.removeEventListener('dragstart', getObjectById) }
    }, [])


    return (
        <div className="project-box"
            id={projectId}
            onClick={() => {
                changeTab(`${projectId}`, '')
            }}
        >
            {
                !isEdit
                    ?
                    <Link
                        className="links"
                        key={uniqid()}
                        to={`/${projectId}`}
                    >
                        <p
                            id={projectId}
                            onDragLeave={handleDragLeave}
                            onDragEnter={handleDragEnter}
                            onDragOver={e => e.preventDefault()}
                            onDrop={handleDragEnd}
                            className="links project-same"
                        >
                            {projectText}
                        </p>
                    </Link>
                    :
                    <input
                        className="project-same"
                        id={projectId}
                        value={projectText}
                        onChange={(e) => setProjectText(e.target.value)}
                        onBlur={handleSaveEdit}
                        type="text"
                    ></input>
            }

            <div
                style={{
                    display: "flex",
                    gap: "0.5rem"
                }}>
                {
                    !isEdit
                        ?
                        <img
                            onClick={() => { setIsEdit(true) }}
                            src="./assets/svg/edit-o-svgrepo-com.svg"
                            className="icon"
                            id={projectId}
                        ></img>
                        :
                        <img
                            onClick={() => { setIsEdit(false) }}
                            id={projectId}
                            src="./assets/svg/lock-svgrepo-com.svg"
                            className="icon"
                        ></img>
                }
                <img
                    onClick={(e) => { handleRemove(e) }}
                    src="./assets/svg/trash.svg"
                    className="icon"
                    id={projectId}
                ></img>
            </div>
            {
                projectTasksRemove
                    ?
                    <PromptRemove
                        id={projectId}
                        changeTab={changeTab}
                        project={project}
                        removePrompt={removePrompt}
                    />
                    :
                    null
            }
        </div>

    )
}

function PromptRemove({ id, changeTab, project, removePrompt }) {

    const dispatch = useDispatch()

    return (
        <div
            id="prompt-container"
        >
            <div
                id="prompt"
            >
                <p>This project contains tasks. Do you want to remove the project and all its tasks?</p>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around"
                    }}
                >
                    <button
                        onClick={(e) => {
                            changeTab('/all-tasks', 'links')
                            // you don't want it crashing right?
                            setTimeout(() => {
                                dispatch({
                                    type: 'ID_REMOVE',
                                    id: e.target.id
                                })
                            })
                        }}
                        id={id}
                    >Remove project</button>
                    <button
                        id={id}
                        onClick={(e) => {
                            changeTab('/all-tasks', 'links')
                            let tasks = project[1].tasks
                            for (let task of tasks) {
                                setTimeout(() => {
                                    dispatch({
                                        type: 'ID_REMOVE',
                                        id: task
                                    })
                                })
                            }
                            setTimeout(() => {
                                dispatch({
                                    type: 'ID_REMOVE',
                                    id: e.target.id
                                })
                            })
                        }}
                    >Remove project and tasks</button>
                </div>
            </div>
            <button
                onClick={() => {
                    removePrompt()
                }}
            >
                Cancel
            </button>
        </div>
    )
}

async function HandleRemove(e, project, changeTab) {

    const dispatch = useDispatch()


}