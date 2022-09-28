import { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { boardService } from "../services/board.new.service";
import { TaskDetails } from "./task-details";
import { TaskPreview } from "./task-preview";
import { ReactComponent as CloseTask } from '../assets/img/close-task-form.svg'
import { saveTask } from "../store/board.actions";


export function TaskList({ group }) {
    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)

    const [isAddingTask, setIsAddingTask] = useState(false)
    const dispatch = useDispatch()

    const onAddTask = ev => {
        ev.preventDefault()
        const title = ev.target[0].value
        if (!title) return
        const task = {
            title:title,
            labelIds:[]
        }

        dispatch(saveTask(board._id, group.id, task, { text: 'added task', taskTitle: task.title, groupId: group.id, user: user }))
        ev.target[0].value = ''
        setIsAddingTask(false)
    }
    const addingTaskShown = () => {
        setIsAddingTask(!isAddingTask)
    }


    return (
        <div className="list-container">
            {group.tasks.map((task, index) => {
                return (
                    <Link to={`${group.id}/${task.id}`} key={task.id}>
                        <Draggable draggableId={task.id} index={index}>

                                {(provided) => {
                                    return (<div key={task.id+index} index={index}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef} >
                                        <TaskPreview
                                            task={task}
                                            group={group}
                                            key={task.id}
                                            
                                        >
                                        </TaskPreview >
                                        
                                    </div>)
                                }}
                            </Draggable>

                        
                    </Link>

                )
            })}

            {!isAddingTask && (
                <div onClick={() => setIsAddingTask(true)} className='add-task'>
                    <svg
                        stroke='#5e6c84'
                        fill='#5e6c84'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        className='icon add-task-plus'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fill='none'
                            stroke='#5e6c84'
                            strokeWidth='2'
                            d='M12,22 L12,2 M2,12 L22,12'
                        ></path>
                    </svg>
                    <p>Add a card</p>
                </div>
            )}

            {isAddingTask && (
                <div className='adding-task-container'>
                    <form onSubmit={onAddTask}>
                        <textarea
                            placeholder='Enter task title..'
                            name='adding-task'
                            id='textarea'
                        />
                        <div className='adding-task-actions'>
                            <button className='add-task-btn'>Add Card</button>
                            <span className='close-adding-task'>
                                <CloseTask onClick={addingTaskShown} />
                            </span>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
// {taskLabels && !task.cover?.isFullCover &&