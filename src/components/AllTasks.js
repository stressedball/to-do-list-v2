import { useEffect, useState } from "react"
import TaskMaker from "./Task-management/TaskMaker"
import uniqid from 'uniqid'

export default function AllTasks({tasks, handleEditWrite, handleImportantWrite, handleDueDateWrite}) {
    const [allTasks, setAllTasks] = useState(tasks)

    const displayTasks = allTasks.map(el => {

        return (
            <TaskMaker key={uniqid()} task={el}
                handleEditWrite={handleEditWrite}
                handleImportantWrite={handleImportantWrite}
                handleDueDateWrite={handleDueDateWrite}
            />
        )
    })

    useEffect(() => {

        setAllTasks(tasks)
    }, [tasks])

    return (

        <div className="task-list">
            {displayTasks}
        </div>
    )
}