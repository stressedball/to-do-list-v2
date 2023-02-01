import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTask({ addTask, setSelectedOption }) {
    const [newTask, setNewTask] = useState('')
    const [important, setImportant] = useState(false)
    const [startDate, setStartDate] = useState(null);

    const handleClick = () => {

        if (newTask === '') {

            alert('Please enter a task')
            return
        }

        const important = document.querySelector('#mark-as-important').classList.contains('important') ? 'important' : ''

        const title = newTask;

        const taskToAdd = { title: title, important: important, dueDate: startDate }
        addTask(taskToAdd)
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

        <div id="make-task">

            <div style={{
                display:"flex"
            }}>
                <p>Enter a new task</p>
                <input value={newTask} onChange={handleChange}></input>
                <button onClick={handleClick}>Add task</button>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <p>Mark as important</p>
                <img
                    id="mark-as-important"
                    style={{
                        width: "30px"
                    }}
                    src="./assets/important-svgrepo-com.svg"
                    onClick={handleImportant}
                ></img>
            </div>

            <div id="set-date"
                style={{
                    display: "flex",
                    alignItems:"center"
            }}>
                <p>Set due date</p>
                <img
                    src="./assets/calendar-svgrepo-com.svg"
                    className="icon"
                ></img>
                <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
            </div>
            <button onClick={() => setSelectedOption('AddProject')}>Switch to Projects</button>
        </div>
    )
}