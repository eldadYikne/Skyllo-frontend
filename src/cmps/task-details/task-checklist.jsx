import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as ChecklistIcon } from '../../assets/img/checklist-icon.svg'
import { ReactComponent as MoreOptions } from '../../assets/img/more-options-icon.svg'
import { utilService } from '../../services/util.service'
import { saveTask, updateBoard } from '../../store/board.actions'
import { ReactComponent as CloseTask } from '../../assets/img/close-task-form.svg'

export function TaskChecklist({ task, group, initChecklist, board, onRemoveChecklist }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)

    const [isFocus, setIsFocus] = useState(false)
    // const [isFocus, setIsFocus] = useState(initChecklist?.isFocus ? initChecklist.isFocus : false)
    const [checklist, setChecklist] = useState({ ...initChecklist })
    const [todoTxt, setTodoTxt] = useState('')
    const [editTodoTxt, setEditTodoTxt] = useState('')
    const [progress, setProgress] = useState(0)
    const [complete, setComplete] = useState()
    const [editMode, setEditMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState('')

    useEffect(() => {
        setChecklist({ ...initChecklist })
        setProgress(getProgress())
    }, [task])


    // useEffect(() => {
    //     dispatch(updateBoard(board))
    // }, [checklist])


    const onToggleInput = () => {
        setTodoTxt('')
        setIsFocus(!isFocus)
    }

    const onEditTodo = (todo, ev) => {
        const todoToUpdate = todo
        todoToUpdate.txt = editTodoTxt
        updateTodo(todoToUpdate)
        setEditMode('')
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
        dispatch(saveTask(board._id, group.id, newTask, { text: `added Todo to checklist ${newChecklist.title}`, user }))
        setTodoTxt('')
        setProgress(getProgress())
    }

    const onRemoveTodo = (ev, todoId) => {
        ev.preventDefault()
        const todoIdx = checklist.todos.findIndex(currTodo => currTodo.id === todoId)
        checklist.todos.splice(todoIdx, 1)
        const newChecklist = { ...checklist }
        updateChecklist(newChecklist, 'removed Todo')
        setIsModalOpen(null)
    }

    const onToggleDone = (todoId) => {
        const todo = checklist.todos.find(currTodo => currTodo.id === todoId)
        const newTodo = { ...todo, isDone: !todo.isDone }
        const activityTxt = newTodo.isDone ? 'checked Todo as done' : 'marked Todo as uncomplete'
        updateTodo(newTodo, activityTxt)
    }

    const updateTodo = (todoToUpdate) => {
        const todoIdx = checklist.todos.findIndex(currTodo => currTodo.id === todoToUpdate.id)
        const newChecklist = { ...checklist }
        newChecklist.todos.splice(todoIdx, 1, todoToUpdate)
        updateChecklist(newChecklist, 'updated Todo')
    }

    const updateChecklist = (newChecklist, text) => {
        setChecklist(newChecklist)
        const checklistIdx = task.checklists.findIndex(currChecklist => currChecklist.id === newChecklist.id)
        task.checklists.splice(checklistIdx, 1, newChecklist)
        const newTask = structuredClone(task)
        dispatch(saveTask(board._id, group.id, newTask, { text, user }))
        const progress = getProgress()
        setProgress(progress)
        setComplete(progress === 100 ? 'green' : '')
    }

    const handleChangeTxt = ({ target }) => {
        const txt = target.value
        setTodoTxt(txt)
    }

    const handleChangeTodoTxt = (ev, todo) => {
        setEditTodoTxt(ev.target.value)
    }

    const getProgress = () => {
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
                <button className='delete-btn ' onClick={(ev) => onRemoveChecklist(ev, checklist)}>Delete</button>
            </div>

            <span className='progress-bar-percent'>{progress.toFixed(0)}%</span>
            <progress id="file" value={progress} max="100" className={complete}>
            </progress>
            {checklist.todos &&
                <section className='todos-container '>
                    {checklist.todos.map(todo => {
                        const classIsDone = todo?.isDone ? 'done ' : 'active '
                        const classIsChecked = todo?.isDone ? 'checkbox checked ' : 'checkbox '
                        return (
                            <div className='checklist-todo ' key={todo.id}>
                                <div className={classIsChecked} onClick={() => onToggleDone(todo.id)} >
                                    {todo.isDone && <span className='checkbox-checked-content'></span>}
                                </div>
                                <div className='todo-single' key={todo.id}>
                                    {/* className={classIsDone} */}
                                    <textarea
                                        className={classIsDone}
                                        // style={{ backgroundColor: todo.txt ? 'inherit' : '#091e420a' }}
                                        name='checklist'
                                        id='checklist-textarea-basic'
                                        defaultValue={todo.txt}
                                        placeholder={todo.txt ? todo.txt : ''}
                                        onChange={(ev) => handleChangeTodoTxt(ev, todo)}
                                        onClick={() => setEditMode(todo.id)}
                                    >
                                    </textarea>
                                    <div>

                                        {editMode === todo.id &&
                                            <div className='edit-todo-container'>
                                                <button className='save-todo-edit-btn' onClick={() => onEditTodo(todo)} >Save</button>
                                                <button className='close-todo-edit-btn'>
                                                    <CloseTask
                                                        className='close-modal-icon'
                                                        onClick={() => setEditMode(null)}
                                                    />
                                                </button>
                                            </div>}
                                    </div>
                                    <div className='remove-todo-container'>
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
                                        )}
                                    </div>
                                </div>
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
