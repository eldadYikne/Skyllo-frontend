import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardService, getGroups } from '../services/board.service'
import { removeGroup, storeAddGroup } from '../store/board.actions'
import { GroupPreview } from './group-preview'
import { addGroup } from "../store/board.actions";
import { ReactComponent as CloseAddGroup } from '../assets/img/close-task-form.svg'

export function GroupList() {
  const board = useSelector(state => state.boardModule.board)
  const dispatch = useDispatch()

  const [labelsShown, setLabelsShown] = useState(board.labelsShown)
  const inputRef = useRef()

  const [isAddGroup, setIsAddGroup] = useState(false)
  const [groups, setGroups] = useState([])

  // useEffect(() => {
  //   loadGroups()
  // }, [])

  // const loadGroups = async () => {
  //   const groupsToDisplay = await boardService.getGroups(board._id)
  //   setGroups(groupsToDisplay)
  // }

  const onAddGroup = (ev) => {
    ev.preventDefault()
    const listTitle = ev.target[0].value
    dispatch(addGroup(board._id, listTitle, 'user added a List'))
  }

  const onRemoveGroup = (ev, groupId) => {
    ev.preventDefault()
    dispatch(removeGroup(board._id, groupId, 'user deleted a List'))
  }

  const isAddGroupShown = () => {
    if (isAddGroup) {
      inputRef.current.focus()
    }

    setIsAddGroup(!isAddGroup)
  }

  if(!groups) return <h1>Loading</h1>
  return (
    <section className='group-list'>
      {groups.map(group => {
        return (
          <li key={group.id}>
            <GroupPreview
              board={board}
              group={group}
              boardId={board._id}
              onRemoveGroup={onRemoveGroup}
            />
          </li>
        )
      })}

      {!isAddGroup && (
        <div
          className='add-group-view'
          onClick={isAddGroupShown}
        >
          <span className='add-group-icon'>
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
                fill='white'
                stroke='#fff'
                strokeWidth='2'
                d='M12,22 L12,2 M2,12 L22,12'
              ></path>
            </svg>
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
