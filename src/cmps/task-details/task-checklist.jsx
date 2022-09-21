import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as ChecklistIcon } from '../../assets/img/checklist-icon.svg'
import { ReactComponent as MoreOptions } from '../../assets/img/more-options-icon.svg'
import { utilService } from '../../services/util.service'
import { saveTask, updateBoard } from '../../store/board.actions'
import { ReactComponent as CloseTask } from '../../assets/img/close-task-form.svg'

export function TaskChecklist({ task, group, initChecklist, setTask, board, onRemoveChecklist }) {

    const dispatch = useDispatch()
    const [isFocus, setIsFocus] = useState(initChecklist?.isFocus ? initChecklist.isFocus : true)
    const [checklist, setChecklist] = useState({ ...initChecklist })
    const [todoTxt, setTodoTxt] = useState('')
    const [progress, setProgress] = useState(0)
    const [complete, setComplete] = useState()
    const [editMode, setEditMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState('')

    useEffect(() => {
        setChecklist({ ...initChecklist })
        setProgress(getProgress())
    }, [task])


    useEffect(() => {
        dispatch(updateBoard(board))
    }, [checklist])


    const onToggleInput = () => {
        setTodoTxt('')
        setIsFocus(!isFocus)
    }
    const onEditTodo = () => {
        setEditMode(true)
    }

    const onAddTodo = () => {
        if (!todoTxt) return
        const todo = {
            id: utilService.makeId(),
            txt: todoTxt,
            isDone: false
        }
        const newChecklist = ({ ...checklist, todos: [...checklist.todos, todo] })
        const newChecklists = task.checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        newChecklists.push(newChecklist)
        const newTask = { ...task, checklists: newChecklists }
        console.log(newTask)
        setTask(newTask)
        setTodoTxt('')
        setProgress(getProgress())
    }

    const onRemoveTodo = (ev, todoId) => {
        ev.preventDefault()
        const todoIdx = checklist.todos.findIndex(currTodo => currTodo.id === todoId)
        checklist.todos.splice(todoIdx, 1)
        const newChecklist = {...checklist}
        updateChecklist(newChecklist)
        setIsModalOpen(null)
    }

    const onToggleDone = (todoId) => {
        const todo = checklist.todos.find(currTodo => currTodo.id === todoId)
        const newTodo = { ...todo, isDone: !todo.isDone }
        updateTodo(newTodo)
    }

    const updateTodo = (todoToUpdate) => {
        const todoIdx = checklist.todos.findIndex(currTodo => currTodo.id === todoToUpdate.id)
        const newChecklist = { ...checklist }
        newChecklist.todos.splice(todoIdx, 1, todoToUpdate)
        updateChecklist(newChecklist)
    }

    const updateChecklist = (newChecklist) => {
        setChecklist(newChecklist)
        const progress = getProgress()
        setProgress(progress)
        setComplete(progress === 100 ? 'green' : '')
    }

    const handleChangeTxt = ({ target }) => {
        console.log(target.value)
        const txt = target.value
        setTodoTxt(txt)
    }


    const getProgress = () => {
        console.log('hello progress')
        if (!checklist.todos || checklist.todos.length === 0) return 0
        const doneCount = checklist.todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)
        const ratio = (doneCount / checklist.todos.length) * 100
        return ratio
    }

    return (

        <div className='checklist-container'>
            <div className='container-checklist-title'>
                <ChecklistIcon className='title-icon' />
                <h5>{checklist.title}</h5>
                <button className='delete-btn ' onClick={(ev) => onRemoveChecklist(ev, checklist.id)}>Delete</button>
            </div>


            <progress id="file" value={progress} max="100" className={complete}></progress>
            {checklist.todos &&
                <section className='todos-container '>
                    {checklist.todos.map(todo => {
                        const classIsDone = todo?.isDone ? 'done ' : 'active '
                        const classIsChecked = todo?.isDone ? 'checkbox checked ' : 'checkbox '
                        return (
                            <div className='checklist-todo '>
                                <div className={classIsChecked} onClick={() => onToggleDone(todo.id)} >
                                    {todo.isDone && <span className='checkbox-checked-content'></span>}
                                </div>
                                <div className={classIsDone} onClick={onEditTodo} key={todo.id}>{todo.txt}</div>
                                <button className='remove-todo-btn' onClick={() => setIsModalOpen(todo.id)}>
                                <MoreOptions />
                                </button>
                                
                                {isModalOpen === todo.id && (
                                    <div className='options-modal-open'>
                                           <section className='modal-actions'>
                                             <p>Actions</p>
                                             <CloseTask
                                              className='close-modal-icon'
                                              onClick={() => setIsModalOpen(null)}
                                            />
                                          </section>
                                          <button
                                            className='delete-group-btn'
                                            onClick={ev => onRemoveTodo(ev, todo.id)}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                )
                                }
                            </div>
                        )
                    })}
                </section>}
            {isFocus &&
                <div className={checklist?.isFocus ? 'editable-checklist' : 'non-editable-checklist'}>
                    <div className='checklist-input'>
                        <input type="text" placeholder="Add an item" onChange={handleChangeTxt} value={todoTxt} />
                        <div className='checklist-btn'>
                            <button className="add-btn" onClick={onAddTodo}>Add</button>
                            <button className="cancel-btn" onClick={onToggleInput}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {!isFocus &&
                <button className='add-open-input' onClick={onToggleInput}>Add an item</button>
            }
        </div>

    )
}
