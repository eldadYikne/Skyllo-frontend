import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { storeAddGroup } from '../store/board.actions'
import { GroupPreview } from './group-preview'
import { ReactComponent as CloseAddGroup } from '../assets/img/close-task-form.svg'

export function GroupList () {
  const board = useSelector(state => state.boardModule.board)
  const dispatch = useDispatch()
  const params = useParams()

  const [isAddGroup, setIsAddGroup] = useState(false)

  const addGroup = (ev) => {
    ev.preventDefault()
    console.log('maaaaa', ev.target[0].value)

    const listTitle = ev.target[0].value

    dispatch(storeAddGroup(board._id, listTitle, ''))
  }

  return (
    <section className='group-list'>
      {board.groups.map(group => {
        return (
          <li key={group.id}>
            <GroupPreview group={group} />
          </li>
        )
      })}

      {!isAddGroup && (
        <div
          className='add-group-view'
          onClick={() => setIsAddGroup(!isAddGroup)}
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
                fill='none'
                stroke='#000'
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
          <form className='add-group' onSubmit={addGroup}>
            <input type='text' placeholder='Enter list title' />
            <div className='add-group-actions'>
              <button className='add-group-btn'>Add list</button>
              <CloseAddGroup
                className='close-add-group-icon'
                onClick={() => setIsAddGroup(!isAddGroup)}
              />
            </div>
          </form>
        </div>
      )}

    </section>
  )
}
