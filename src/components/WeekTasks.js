import parseISO from 'date-fns/parseISO'
import isThisWeek from 'date-fns/isThisWeek'
import { useState, useEffect } from 'react'
import TaskMaker from './Task-management/TaskMaker'
import uniqid from 'uniqid'

export default function WeekTasks({ tasks, handleEditWrite, handleImportantWrite, handleDueDateWrite, handleDoneWrite, handleAppendTaskWrite }) {

    const [isWeek, setIsWeek] = useState(tasks)

    useEffect(() => {

        setIsWeek(tasks)
    }, [tasks])

    const displayTasks = isWeek.map(el => {
        if (isThisWeek(parseISO(el.dueDate), { weekStartOn: 0 }) && !el.done) {

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

    return (
        <div className='task-list'>

            {displayTasks}
        </div>
    )

}