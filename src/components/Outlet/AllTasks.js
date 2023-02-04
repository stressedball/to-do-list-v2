import TaskMaker from "../Task-management/TaskMaker"
import uniqid from 'uniqid'
import { useSelector } from 'react-redux';

export default function AllTasks() {

    const items = useSelector(state => state.items);

    const displayTasks = items.map(el => {

        if (!el[1].done && !el[1].tasks) {

            return (

                <TaskMaker
                    key={uniqid()}
                    task={el}
                />
            )
        }

    })

    return (

        <div className="task-list">
            {displayTasks}
        </div>
    )
}