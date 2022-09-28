import { TaskList } from './task-list'
import { useEffect, useState } from 'react'
import { ReactComponent as CloseTask } from '../assets/img/close-task-form.svg'
import { ReactComponent as MoreOptions } from '../assets/img/more-options-icon.svg'

import { useDispatch, useSelector } from 'react-redux'
import { saveTask, updateBoard } from '../store/board.actions'
import { Droppable } from 'react-beautiful-dnd'

export function GroupPreview({ board, group, boardId, onRemoveGroup,index }) {
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

    dispatch(saveTask(boardId, group.id, task, { text: 'added task', user: user }))
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
    const boardToUpdate = structuredClone(board)
    if (!title) return
    boardToUpdate.groups[groupIdx].title = title
    dispatch(updateBoard(boardToUpdate))
  }

  const addingTaskShown = () => {
    setIsAddingTask(!isAddingTask)
  }

  return (
    <section className='group-preview '>
      <div className='group-preview-header'>
        <form onSubmit={onSaveTitle}>
          <input onChange={handleChangeTitle} type='text' value={title} id='' onBlur={onSaveTitle} />
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
          {(provided,snapshot) => {
            return <div
              {...provided.draggableProps}
              ref={provided.innerRef} >

              <TaskList group={group}>
              </TaskList>
              {provided.placeholder}
            </div>
          }}

        </Droppable>
      </div>


      
    </section>
  )
}
