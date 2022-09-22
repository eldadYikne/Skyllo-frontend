import { TaskList } from './task-list'
import { useEffect, useState } from 'react'
import { ReactComponent as CloseTask } from '../assets/img/close-task-form.svg'
import { ReactComponent as MoreOptions } from '../assets/img/more-options-icon.svg'

import { useDispatch, useSelector } from 'react-redux'
import { saveTask, updateBoard } from '../store/board.actions'
import { Droppable } from 'react-beautiful-dnd'

export function GroupPreview({ board, group, boardId, onRemoveGroup }) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isShowOptions, setIsShowOptions] = useState(false)
  const [title, setTitle] = useState('')
  const user = useSelector(state => state.userModule.user)

  const dispatch = useDispatch()

  useEffect(() => {
    setTitle(group.title)

  }, [group.title])

  const onAddTask = ev => {
    ev.preventDefault()
    const title = ev.target[0].value
    if (!title) return
    const task = {
      title
    }

    dispatch(saveTask(boardId, group.id, task, { text: 'added task', taskTilte: task.title, groupId:group.id, user: user }))
    ev.target[0].value = ''
    setIsAddingTask(false)
  }

  const handleChangeTitle = (ev) => {
    const title = ev.target.value
    setTitle(title)
  }

  const onSaveTitle = (ev) => {
    ev.preventDefault()
    const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
    if (!title) return
    board.groups[groupIdx].title = title
    dispatch(updateBoard(board))
  }

  const addingTaskShown = () => {
    setIsAddingTask(!isAddingTask)
  }

  return (
    <section className='group-preview '>
      <div className='group-preview-header'>
        <form onSubmit={onSaveTitle}>
          <input onChange={handleChangeTitle} type='text' value={title} id='' />
        </form>

        <div
          onClick={() => setIsShowOptions(!isShowOptions)}
          className='group-more-options'
        >
          <MoreOptions />
        </div>

        {isShowOptions && (
          <div className='options-modal-open'>
            <section className='modal-actions'>
              <p>Actions</p>
              <CloseTask
                className='close-modal-icon'
                onClick={() => setIsShowOptions(!isShowOptions)}
              />
            </section>

            <button
              className='delete-group-btn'
              onClick={ev => onRemoveGroup(ev, group.id, group.title)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className='list-container'>
        <Droppable droppableId={group.id}>
          {(provided) => {
            return (<div
              {...provided.draggableProps}
              ref={provided.innerRef} >

              <TaskList group={group}>
                {provided.placeholder}
              </TaskList>
            </div>)
          }}

        </Droppable>
      </div>


      {!isAddingTask && (
        <div onClick={() => setIsAddingTask(true)} className='add-task'>
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
              <button className='add-task-btn'>Add Task</button>
              <span className='close-adding-task'>
                <CloseTask onClick={addingTaskShown} />
              </span>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
