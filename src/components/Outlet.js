import TaskMaker from "./TaskMaker"
import uniqid from 'uniqid'
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import parseISO from 'date-fns/parseISO'
import isThisWeek from 'date-fns/isThisWeek'

export default function TasksOutlet() {

    const items = useSelector(state => state.items);
    
    const location = useLocation().pathname.split('/').pop()
    
    let displayTasks = null

    if (location === 'all-tasks') {
        displayTasks = items.map(el => {
            if (!el[1].done && !el[1].tasks) {
                return (
                    <TaskMaker
                        key={uniqid()}
                        task={el}
                    />
                )
            }
        })
    } else if (location === 'week-tasks') {
        displayTasks = items.map(el => {
            if (isThisWeek(parseISO(el[1].dueDate), { weekStartOn: 0 })
                && !el[1].done) {
                return (
                    <TaskMaker
                        key={uniqid()}
                        task={el}
                    />
                )
            }
        })
    } else if (location === 'done-tasks') {
        displayTasks = items.map(el => {
            if (el[1].done && !el[1].tasks) {
                return (
                    <TaskMaker
                        key={uniqid()}
                        task={el}
                    />
                )
            }
        })
    } else if (location === 'important-tasks') {
        displayTasks = items.map(el => {
            if (el[1].important === "important"
                && !el[1].done && !el[1].tasks) {

                return (
                    <TaskMaker
                        key={uniqid()}
                        task={el}
                    />
                )
            }
        })
    } else {
        const project = items.filter(el => el[0] === location)[0]
        const arrOfTasks = project[1].tasks
        displayTasks = arrOfTasks.map(projectTask => {
            return items.filter(data => {
                if (data[0] === projectTask) {
                    return data[1]
                }
            })
        })
        displayTasks = displayTasks.map(el => {
            return (
                <TaskMaker
                    key={uniqid()}
                    task={el[0]}
                />
            )
        })
    }

    return (

        <div className="task-list">
            {displayTasks}
        </div>
    )
}