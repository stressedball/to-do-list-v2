import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TaskMaker from "./Task-management/TaskMaker"
import uniqid from 'uniqid'

export default function Project({ projects, handleEditWrite, handleImportantWrite, handleDueDateWrite, handleDoneWrite, handleAppendTaskWrite }) {

    const location = useLocation().pathname.split('/').pop()
    const project = projects.find(el => el.id === location);
    const tasks = project.tasks.map(id => {
        const task = getTask(id)
        return (
            <TaskMaker key={uniqid()} task={task}
                handleEditWrite={handleEditWrite}
                handleImportantWrite={handleImportantWrite}
                handleDueDateWrite={handleDueDateWrite}
                handleDoneWrite={handleDoneWrite}
                handleAppendTaskWrite={handleAppendTaskWrite}
            />
        )
    }
    )
    return (
        <div className="task-list">
            {
                tasks
            }
        </div>
    )
}

const getTask = id => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key === id) {
            const task = JSON.parse(localStorage.getItem(key))
            task.id = key
            return task
        }
    }
}
