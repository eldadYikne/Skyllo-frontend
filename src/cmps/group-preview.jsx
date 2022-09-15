import { TaskList } from './task-list'
import { useState } from "react";
import { ReactComponent as CloseTask } from '../assets/img/close-task-form.svg';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/board.actions';


export function GroupPreview({ group, boardId }) {

    const [isAddingTask, setIsAddingTask] = useState(false)
    const dispatch = useDispatch()
    

    const onAddTask = (ev) => {
        ev.preventDefault()
        const task = {
            title: ev.target[0].value
        }
        dispatch(addTask(boardId, group.id, task, 'user addad task'))
        ev.target[0].value =''
    }

    return (
        <section className='group-preview '>
            <div className='group-preview-header'>
                <form>
                    <input type="text" value={'Group title'} id="" />
                </form>
                <div className='group-more-options'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="48"></circle><circle cx="416" cy="256" r="48"></circle><circle cx="96" cy="256" r="48"></circle></svg>
                </div>
            </div>

            <div className='list-container'>
                <TaskList group={group} />
            </div>

            {!isAddingTask && <div onClick={() => setIsAddingTask(!isAddingTask)} className='add-task'>

                <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 24 24'
                    className='icon'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fill='none'
                        stroke='#000'
                        strokeWidth='2'
                        d='M12,22 L12,2 M2,12 L22,12'
                    ></path>
                </svg>
                <p>Add a task</p>
            </div>}

            {isAddingTask &&
                <div className="adding-task-container">
                    <form onSubmit={onAddTask}>
                        <input type="textarea" placeholder="Enter task title.." name="adding-task" id="textarea" />

                        <div className='adding-task-actions'>
                            <button className='add-task-btn'>Add Task</button>
                            <span className='close-adding-task'>
                                <CloseTask onClick={() => setIsAddingTask(!isAddingTask)} />
                            </span>
                        </div>
                    </form>
                </div>
            }

        </section>
    )
}
