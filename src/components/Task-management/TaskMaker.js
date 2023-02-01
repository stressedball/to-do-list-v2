
import uniqid from 'uniqid'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TaskMaker({ task, handleImportantWrite, handleEditWrite }) {
    const [isImportant, setIsImportant] = useState(task.important)
    const [taskText, setTaskText] = useState(task.title)
    const handleRemove = (e) => {

    }

    const handleImportant = (e) => {
        handleImportantWrite(e.target.parentElement.parentElement.id)
        setIsImportant(!isImportant)
    }

    const handleEdit = (e) => {
        setTaskText(e.target.value)
    }

    const handleDone = () => {

    }
    const saveEdit = (e) => {
        handleEditWrite(e.target.parentElement.parentElement.id, e.target.value)
        setTaskText(task.title)
    }

    return (
        <div
            id={task.id}
            className="task"
        >
            <div style={{
                display: "flex",
                flex: "1 0 auto"
            }}>
                <input type="checkbox"></input>
                <input type="text"
                    value={taskText}
                    onChange={handleEdit}
                    onBlur={saveEdit}
                    style={{
                        border: "inset 1px solid"
                    }}
                    className="task-text"
                ></input>
            </div>
            <div className="icon-container">
                <img
                    src="./assets/important-svgrepo-com.svg"
                    className={`${isImportant ? 'important' : ''} icon`}
                    onClick={handleImportant}
                >
                </img>
                {/* change to Date from React */}
                <p>{task.dueDate}</p>
                <DatePicker value={new Date("2023-02-02") }/>
                {/* <img
                    src="./assets/remove-svgrepo-com.svg"
                    onClick={handleRemove}
                    className="icon" /> */}
            </div>
        </div>
    )
}

