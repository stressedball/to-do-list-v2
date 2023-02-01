import parseISO from 'date-fns/parseISO'
import isThisWeek from 'date-fns/isThisWeek'
import { useState, useEffect } from 'react'
import TaskMaker from './Task-management/TaskMaker'
import uniqid from 'uniqid'
export default function WeekTasks({ tasks, handleEditWrite, handleImportantWrite }) {

    const [isWeek, setIsWeek] = useState(tasks)
    
    useEffect(() => {
        
        setIsWeek(tasks)
    }, [tasks])

    const displayTasks = isWeek.map(el => {

        if (el.dueDate) {

            const splitDate = el.dueDate.split('/')
            const formattedDate = splitDate[2].concat('-').concat(splitDate[1]).concat('-').concat(splitDate[0])
            
            if (isThisWeek(parseISO(formattedDate, { weekStartOn: 0 }))) {
            
                return (
                    <TaskMaker key={uniqid()} task={el}
                        handleEditWrite={handleEditWrite}
                        handleImportantWrite={handleImportantWrite}
                    />
                )
            }
        }
    })

    return (
        <div className='task-list'>

            {displayTasks}
        </div>
    )
}