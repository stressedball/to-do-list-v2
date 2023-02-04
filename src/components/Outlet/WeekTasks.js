import parseISO from 'date-fns/parseISO'
import isThisWeek from 'date-fns/isThisWeek'
import TaskMaker from '../Task-management/TaskMaker'
import uniqid from 'uniqid'
import { useSelector } from 'react-redux';

export default function WeekTasks() {

    const items = useSelector(state => state.items);

    const displayTasks = items.map(el => {
        if (isThisWeek(parseISO(el[1].dueDate), { weekStartOn: 0 })
            && !el[1].done) {

            return (
                <TaskMaker
                    key={uniqid()}
                    task={el}
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