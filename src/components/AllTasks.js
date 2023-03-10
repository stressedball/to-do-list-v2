import { useEffect, useState } from "react"
import TaskMaker from "./Task-management/TaskMaker"
import uniqid from 'uniqid'

export default function AllTasks({ tasks, handleEditWrite, handleImportantWrite, handleDueDateWrite, handleDoneWrite, handleAppendTaskWrite }) {

    const [allTasks, setAllTasks] = useState(tasks)

    const displayTasks = allTasks.map(el => {
        if (!el.done) {
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

        setAllTasks(tasks)
    }, [tasks])

    return (

        <div className="task-list">
            {displayTasks}
        </div>
    )
}