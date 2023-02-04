import { useLocation } from "react-router-dom";
import TaskMaker from "../Task-management/TaskMaker"
import uniqid from 'uniqid'
import { useSelector } from 'react-redux';

export default function Project() {

    const location = useLocation().pathname.split('/').pop()
   
    const items = useSelector(state => state.items);

    const project = items.filter(el => el[0] === location)[0]
   
    const arrOfTasks = project[1].tasks
   
    const projectTasks = arrOfTasks.map(projectTask => {
        return items.filter(data => {
            return data[0] === projectTask
        })
    })

    const displayTasks = projectTasks.map(el => {
        return (

            <TaskMaker
                key={uniqid()}
                task={el[0]}
            />
        )
    })

    return (

        <div className="task-list">
            {displayTasks}
        </div>
    )
}

