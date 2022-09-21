import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { removeGroup, storeAddGroup } from '../store/board.actions'
import { GroupPreview } from './group-preview'
import { addGroup } from "../store/board.actions";
import { ReactComponent as CloseAddGroup } from '../assets/img/close-task-form.svg'
import { ReactComponent as AddGroupIcon } from '../assets/img/add-group-icon.svg'
import { LoaderSkyllo } from './loader-cmp'
import { Draggable } from 'react-beautiful-dnd'

export function GroupList() {
  const board = useSelector(state => state.boardModule.board)
  const dispatch = useDispatch()
  const [labelsShown, setLabelsShown] = useState(board.labelsShown)
  const inputRef = useRef()
  const [isAddGroup, setIsAddGroup] = useState(false)

  const onAddGroup = (ev) => {
    ev.preventDefault()
    const listTitle = ev.target[0].value
    dispatch(addGroup(board._id, listTitle, { text: `added a group `, user: 'usery' }))
  }

  const onRemoveGroup = (ev, groupId) => {
    ev.preventDefault()
    dispatch(removeGroup(board._id, groupId, { text: `added a group `, user: 'usery' }))
  }
  const isAddGroupShown = () => {
    if (isAddGroup) {
      inputRef.current.focus()
    }
    setIsAddGroup(!isAddGroup)
  }

  if (!board) return <LoaderSkyllo />
  return (
    <section className='group-list'>
      {board?.groups && board.groups.map((group, index) => {

        return (

          <Draggable draggableId={group.id} key={index} index={index}>
            {(provided) => {
              return (<li className='list-move-group' index={index}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef} >

                <GroupPreview
                  board={board}
                  group={group}
                  boardId={board._id}
                  onRemoveGroup={onRemoveGroup}
                >
                  {provided.placeholder}
                </GroupPreview>
              </li>)
            }}
          </Draggable>
        )
      })}


      {!isAddGroup && (
        <div
          className='add-group-view'
          onClick={isAddGroupShown}
        >
          <span className='add-group-icon'>
            <AddGroupIcon />
          </span>
          <span>Add another List</span>
        </div>
      )}
      {isAddGroup && (
        <div className='add-group-form'>
          <form className='add-group' onSubmit={onAddGroup}>
            <input ref={inputRef} type='text' placeholder='Enter list title' />
            <div className='add-group-actions'>
              <button className='add-group-btn'>Add list</button>
              <CloseAddGroup
                className='close-add-group-icon'
                onClick={isAddGroupShown}
              />
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
