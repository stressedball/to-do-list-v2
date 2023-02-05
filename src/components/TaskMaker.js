import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import parseISO from 'date-fns/parseISO'
import isValid from 'date-fns/isValid';
import { useDispatch } from "react-redux";

export default function TaskMaker({ task }) {

    const taskId = task[0]
    const taskDetails = task[1]
    const isImportant = taskDetails.important
    const [taskText, setTaskText] = useState(taskDetails.title)
    const [dueDate, setDueDate] = useState(getDueDate(taskDetails.dueDate))
    const done = taskDetails.done ? taskDetails.done : false
    const [inputIsFocus, setInputIsFocus] = useState(true)
    const dispatch = useDispatch()

    const handleImportant = e => {
        dispatch({
            type: 'SET_IMPORTANT',
            id: e.target.parentElement.parentElement.id
        })
    }

    // helper otherwise localStorage only registers first input
    const handleEdit = e => {
        setTaskText(e.target.value)
    }

    const handleDone = e => {
        dispatch({
            type: 'TASK_DONE',
            id: e.target.id,
            done: e.target.checked
        })
    }

    const handleSaveEdit = e => {
        dispatch({
            type: 'TITLE_EDIT',
            id: e.target.parentElement.parentElement.id,
            value: e.target.value
        })
    }

    const handleDueDate = (date, id) => {
        dispatch({
            type: 'DATE_EDIT',
            id: id,
            dueDate: date === null ? 'N/A' : date.toISOString()
        })
    }

    useEffect(() => {
        const input = document.querySelector(`input.task-text`);
        input.addEventListener('focus', () => setInputIsFocus(false));
        input.addEventListener('blur', () => setInputIsFocus(true));

        return () => {
            input.removeEventListener('focus', () => setInputIsFocus(false));
            input.removeEventListener('blur', () => setInputIsFocus(true));
        };
    }, []);

    return (

        <div
            id={taskId}
            className={`task ${done}`}
            draggable={`${inputIsFocus}`}
        >
            <div style={{
                display: "flex",
                flex: "1 0 auto"
            }}>
                <input type="checkbox"
                    draggable="false"
                    onChange={handleDone}
                    id={taskId}
                    checked={done}
                ></input>

                <input
                    draggable="false"
                    type="text"
                    value={taskText}
                    onChange={handleEdit}
                    onBlur={handleSaveEdit}
                    className="task-text"
                ></input>
            </div>

            <div className="icon-container">

                <img
                    draggable="false"
                    src="./assets/svg/important-svgrepo-com.svg"
                    className={`${isImportant === 'important' ? 'important' : ''} icon`}
                    onClick={handleImportant}
                >
                </img>

                <DatePicker
                    draggable="false"
                    dateFormat="dd-MM-yyyy"
                    selected={dueDate}
                    onChange={date => {
                        setDueDate(date)
                        handleDueDate(date, taskId)
                    }}
                />
                <img
                    onClick={() => {
                        // setIsEdit(true)
                    }}
                    src="./assets/svg/trash.svg"
                    className="icon"
                ></img>
            </div>
        </div>
    )
}

const getDueDate = date => {
    const parsedDate = parseISO(date);
    if (isValid(parsedDate)) { return parsedDate }
    return null
}

