import { useState, useEffect, useRef } from "react"
import uniqid from 'uniqid'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"

export default function ProjectMaker({ project, changeTab }) {

    const projectId = project[0]
    const [projectText, setProjectText] = useState(project[1].title)
    const [dragData, setDragData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
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
                            onClick={() => {
                                setIsEdit(true)
                            }}
                            src="./assets/svg/edit-o-svgrepo-com.svg"
                            className="icon"
                            id={projectId}
                        ></img>
                        :
                        <img
                            onClick={() => {
                                setIsEdit(false)
                            }}
                            id={projectId}
                            src="./assets/svg/lock-svgrepo-com.svg"
                            className="icon"
                        ></img>
                }
                <img
                    onClick={() => {
                        // setIsEdit(true)
                    }}
                    src="./assets/svg/trash.svg"
                    className="icon"
                    id={projectId}
                ></img>
            </div>
        </div>

    )
}

