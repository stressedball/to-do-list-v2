import { useEffect, useState } from "react"
import TaskMaker from "./Task-management/TaskMaker"
import uniqid from 'uniqid'

export default function ImportantTasks({ tasks, handleEditWrite, handleImportantWrite, handleDueDateWrite }) {

    const [showTasks, setShowTasks] = useState(tasks)

    const displayTasks = showTasks.map(el => {

        if (el.important === "important") {
            return (
                <TaskMaker key={uniqid()} task={el}
                    handleEditWrite={handleEditWrite}
                    handleImportantWrite={handleImportantWrite}
                    handleDueDateWrite={handleDueDateWrite}
                />
            )
        }
    })

    useEffect(() => {

        setShowTasks(tasks)
    }, [tasks])

    return (

        <div className="task-list">
            {displayTasks}
        </div>
    )
}