import { useEffect, useState } from "react"
import TaskMaker from "./Task-management/TaskMaker"
import uniqid from 'uniqid'

export default function DoneTasks({ tasks, handleDoneWrite, handleEditWrite, handleDueDateWrite, handleImportantWrite, handleAppendTaskWrite }) {

    const [doneTasks, setDoneTasks] = useState(tasks)

    const displayTasks = doneTasks.map(el => {

        if (el.done) {

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

        setDoneTasks(tasks)
    }, [tasks])

    return (
        <div className='task-list'>

            {displayTasks}
        </div>
    )
}