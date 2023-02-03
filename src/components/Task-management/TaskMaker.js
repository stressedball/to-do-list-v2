
import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import parseISO from 'date-fns/parseISO'
import isValid from 'date-fns/isValid';

export default function TaskMaker({ task, handleImportantWrite, handleEditWrite, handleDueDateWrite, handleDoneWrite }) {

    const [isImportant, setIsImportant] = useState(task.important)
    const [taskText, setTaskText] = useState(task.title)
    const [dueDate, setDueDate] = useState(getDueDate(task.dueDate))
    const [done, setDone] = useState(() => {
        if (task.done) return task.done
        return false
    })

    const handleImportant = (e) => {
        handleImportantWrite(e.target.parentElement.parentElement.id)
        setIsImportant(!isImportant)
    }

    const handleEdit = (e) => {
        setTaskText(e.target.value)
    }

    const handleDone = (e) => {
        handleDoneWrite(e.target.id, e.target.checked)
        setDone(task.done)
    }

    const saveEdit = (e) => {
        handleEditWrite(e.target.parentElement.parentElement.id, e.target.value)
        setTaskText(task.title)
    }

    return (

        <div
            id={task.id}
            className={`task ${done}`}
            draggable="true"
        >
            <div style={{
                display: "flex",
                flex: "1 0 auto"
            }}>
                <input type="checkbox"
                    draggable="false"
                    onChange={handleDone}
                    id={task.id}
                    checked={done}
                ></input>
                <input
                    draggable="false"
                    type="text"
                    value={taskText}
                    onChange={handleEdit}
                    onBlur={saveEdit}
                    className="task-text"
                ></input>
            </div>
            <div className="icon-container">
                <img
                    draggable="false"
                    src="./assets/important-svgrepo-com.svg"
                    className={`${isImportant ? 'important' : ''} icon`}
                    onClick={handleImportant}
                >
                </img>
                <DatePicker
                    draggable="false"
                    dateFormat="dd-MM-yyyy"
                    selected={dueDate}
                    onChange={date => {
                        setDueDate(date)
                        handleDueDateWrite(date, task.id)
                    }}
                />
            </div>
        </div>
    )
}

const getDueDate = date => {
    const parsedDate = parseISO(date);
    if (isValid(parsedDate)) { return parsedDate }
    return null
}

