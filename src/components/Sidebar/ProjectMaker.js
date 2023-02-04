import { useState, useEffect } from "react"
import uniqid from 'uniqid'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProjectMaker({ project, changeTab }) {

    const projectId = project[0]
    const [projectText, setProjectText] = useState(project[1].title)
    const [dragData, setDragData] = useState(null)
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const location = useLocation().pathname.split('/').pop()

    const handleStyle = (e) => {
        // setProjectText(e.target.value)
    }

    const correctPath = () => {
        changeTab(`/project/${projectId}`)
    }
    console.log(projectId)

    const handleEdit = e => {
        e.preventDefault()
        setProjectText(e.target.value)
    }

    const handleSaveEdit = e => {
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
        return () => window.removeEventListener('dragstart', getObjectById)
    }, [])


    return (
        <div className="project-box"
            onClick={correctPath()}
            id={projectId}
        >
            {
                !isEdit ?

                    <p
                        onDragLeave={handleDragLeave}
                        onDragEnter={handleDragEnter}
                        onDragOver={e => e.preventDefault()}
                        onDrop={handleDragEnd}
                        className="links project-same"
                        // to={`/project/${projectId}`}
                        onClick={correctPath()}
                        key={uniqid()}>
                        {projectText}
                    </p>
                    :
                    <input
                        className="project-same"
                        id={projectId}
                        value={projectText}
                        onChange={handleEdit}
                        onBlur={handleSaveEdit}
                        type="text"
                        onClick={correctPath()}
                    ></input>
            }

            {
                !isEdit ?
                    <img
                        onClick={() => {
                            correctPath()
                            setIsEdit(!isEdit)
                        }
                        }
                        src="./assets/svg/edit-o-svgrepo-com.svg"
                        className="icon"
                        id={projectId}
                    ></img>
                    :
                    <img
                        onClick={() => {
                            correctPath()
                            setIsEdit(!isEdit)
                        }}
                        id={projectId}
                        src="./assets/svg/lock-round-svgrepo-com.svg"
                        className="icon"
                    ></img>
            }

        </div>

    )
}


                    // <Link
                    //     onDragLeave={handleDragLeave}
                    //     onDragEnter={handleDragEnter}
                    //     onDragOver={e => e.preventDefault()}
                    //     onDrop={handleDragEnd}
                    //     className="links project-same"
                    //     to={`/project/${projectId}`}
                    //     key={uniqid()}>

                    // </Link>