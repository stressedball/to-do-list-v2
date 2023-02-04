import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";

export default function AddTask({ setSelectedOption }) {

    const [newTask, setNewTask] = useState('')
    const [important, setImportant] = useState(false)
    const [startDate, setStartDate] = useState(null);

    const dispatch = useDispatch()

    const handleClick = () => {

        if (newTask === '') {

            alert('Please enter a task')
            return
        }

        const important = document.querySelector('#mark-as-important').classList.contains('important') ? 'important' : ''

        const title = newTask;

        const taskToAdd = {
            title: title,
            important: important,
            dueDate: (startDate === null ? 'N/A' : startDate.toISOString()),
            done: false
        }

        dispatch({ type: 'ADD_TASK', item: taskToAdd })
    }

    const handleChange = (e) => { setNewTask(e.target.value) }

    const handleImportant = () => { setImportant(!important) }

    useEffect(() => {

        document.querySelector('#mark-as-important').classList.remove('important')

        if (important) {
            document.querySelector('#mark-as-important').classList.add('important')
        }

    }, [important])

    return (

        <div className="make tasks">

            <div className="container">
                <div className="horizontal">
                    <input
                        id="task-title"
                        value={newTask}
                        onChange={handleChange}
                        placeholder='So much to do...Where should I start?'></input>
                    <button
                        onClick={handleClick}
                    >Add task</button>
                </div>

                <div id="set-date"
                    className="horizontal">
                    <div className="horizontal">
                        <p>Mark as important</p>
                        <img
                            id="mark-as-important"
                            style={{
                                width: "30px"
                            }}
                            src="./assets/svg/important-svgrepo-com.svg"
                            onClick={handleImportant}
                            alt='important-icon'
                        ></img>
                    </div>
                    <img
                        src="./assets/svg/calendar-svgrepo-com.svg"
                        className="icon"
                    ></img>

                    <DatePicker
                        style={{ width: "auto" }}
                        dateFormat="dd-MM-yyyy"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
            </div>

            <button className="make-switcher" onClick={() => setSelectedOption('AddProject')}>Switch to Projects</button>

        </div>
    )
}