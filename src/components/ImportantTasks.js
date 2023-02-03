import { useEffect, useState } from "react"
import TaskMaker from "./Task-management/TaskMaker"
import uniqid from 'uniqid'

export default function ImportantTasks({ tasks, handleEditWrite, handleImportantWrite, handleDueDateWrite, handleDoneWrite, handleAppendTaskWrite }) {

    const [weekTasks, setWeekTasks] = useState(tasks)

    const displayTasks = weekTasks.map(el => {

        if (el.important === "important" && !el.done) {

            return (
                <TaskMaker key={uniqid()} task={el}
                    handleEditWrite={handleEditWrite}
                    handleImportantWrite={handleImportantWrite}
                    handleDueDateWrite={handleDueDateWrite}
                    handleDoneWrite={handleDoneWrite}
                    handleAppendTaskWrite={handleAppendTaskWrite}
                />
            )
        }
    })

    useEffect(() => {

        setWeekTasks(tasks)
    }, [tasks])

    return (

        <div className="task-list">
            {displayTasks}
        </div>
    )
}