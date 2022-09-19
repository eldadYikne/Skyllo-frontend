import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as ChecklistIcon } from '../assets/img/checklist-icon.svg'
import { utilService } from '../services/util.service'
import { updateBoard } from '../store/board.actions'

export function TaskChecklist({ task, initChecklist, setTask, board, onRemoveChecklist }) {
    const [checklist, setChecklist] = useState({...initChecklist})
    const [ todoTxt, setTodoTxt ] = useState('')
    const dispatch = useDispatch()
    const [isFocus, setIsFocus] = useState(initChecklist?.isFocus? initChecklist.isFocus : true)
    const [progress, setProgress] = useState(0)
    const [complete, setComplete] = useState()
    // const [selectedList, setSelectedList] = useState(initChecklist)
    
    const classIsFocus = initChecklist?.isFocus? 'editable-checklist' : 'non-editable-checklist'
   
    useEffect(() => {
        setChecklist({...initChecklist})
        setProgress(getProgress())

    },[task])

    useEffect(() => {
        dispatch(updateBoard(board))
    },[checklist])
    
    const onToggleInput = () => {
        setTodoTxt('')
        // setChecklist({...checklist, isFocus: !checklist.isFocus})
        setIsFocus(!isFocus)
    }

    const onAddTodo = () => {
        if(!todo.txt) return
        const todo = {
            id: utilService.makeId(),
            txt: todoTxt,
            isDone: false
        }
        const newChecklist = ({...checklist, todos: [...checklist.todos, todo] })
        const newChecklists = task.checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        newChecklists.push(newChecklist)
        const newTask = {...task, checklists: newChecklists}
        console.log(newTask)
        setTask(newTask)
        setTodoTxt('')
        setProgress(getProgress())
    }

    const onToggleDone = (todoId) => {
        const todo = checklist.todos.find(currTodo => currTodo.id === todoId)
        const newTodo = {...todo, isDone: !todo.isDone}
        const todoIdx = checklist.todos.findIndex(currTodo => currTodo.id === todoId)
        const newChecklist = {...checklist}
        newChecklist.todos.splice(todoIdx, 1, newTodo)
        setChecklist(newChecklist)
        const progress = getProgress()
        setProgress(progress)
        setComplete(progress === 100 ? 'green' : '')
        console.log(complete)
    }

    const handleChangeTxt = ({ target }) => {
        console.log(target.value)
        const txt = target.value
        setTodoTxt(txt)
    }

    const getProgress = () => {
        console.log('hello progress')
        if(!checklist.todos || checklist.todos.length === 0) return 0
        const doneCount = checklist.todos.reduce((acc, todo) => {
            if(todo.isDone) acc++
            return acc
        }, 0)
        const ratio = ( doneCount / checklist.todos.length ) * 100
        return ratio 
    }

    // if(!initChecklist) return <h1>loading</h1> 
    return (
        <div className='checklist-container'>
                <div className='container-checklist-title'>
                  <ChecklistIcon className='title-icon' />
                  <h5>{checklist.title}</h5>
                  <button className='delete-btn' onClick={(ev) => onRemoveChecklist(ev,checklist.id)}>Delete</button>
                </div>
                <progress id="file" value={progress} max="100" class={complete} style={{background: 'green'}} ></progress>
                {checklist.todos && 
                <section className='todos-container'>
                    {checklist.todos.map(todo => {
                        const classIsDone = todo?.isDone? 'done' : 'active'
                        const classIsChecked = todo?.isDone? 'checkbox checked' : 'checkbox'
                        return (
                        <div className='checklist-todo'>
                            <div className={classIsChecked} onClick={()=> onToggleDone(todo.id)} >
                                {todo.isDone && <span className='checkbox-checked-content'></span>}
                            </div>
                            <div className={classIsDone} key={todo.id}>{todo.txt}</div>
                        </div>
                        )
                    })}
                </section>}
                {isFocus && 
                <div className={checklist?.isFocus? 'editable-checklist' : 'non-editable-checklist'}>
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