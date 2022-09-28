import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.new.service'
import { removeGroup, storeAddGroup, updateBoard } from '../store/board.actions'
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
  const user = useSelector(state => state.userModule.user)

  const onAddGroup = (ev) => {
    ev.preventDefault()
    const listTitle = ev.target[0].value
    if(!listTitle)return
    dispatch(addGroup(board._id, listTitle, { text: `added a group `, user: user }))
  }

  const onRemoveGroup = (ev, groupId) => {
    ev.preventDefault()
    dispatch(removeGroup(board._id, groupId, { text: `added a group `, user: user }))
  }
  const isAddGroupShown = () => {
    if (isAddGroup) {
      inputRef.current.focus()
    }
    setIsAddGroup(!isAddGroup)
  }
  const onShownPopover = () => {
    board.isPopoverShown = false
    const boardToUpdate = { ...board }
    dispatch(updateBoard(boardToUpdate))

}
const pageHeigth= user? '160px': '140px'

  if (!board) return <LoaderSkyllo />
  return (
    <section onClick={onShownPopover} className='group-list'>
      {board?.groups && board.groups.map((group, index) => {

        return (

          <Draggable draggableId={group.id} key={group.id} index={index}>
            {(provided) => {
              return (<div className='list-move-group' style={{  maxHeight: `calc(100vh - ${pageHeigth})`}}  index={index}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef} >

                <GroupPreview
                  board={board}
                  group={group}
                  boardId={board._id}
                  onRemoveGroup={onRemoveGroup}
                >
                </GroupPreview>
                  {/* {provided.placeholder} */}
              </div>)
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
