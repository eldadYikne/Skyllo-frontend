import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DynamicCmp } from './dynamic-cmp'

import { ReactComponent as CalenderIcon } from '../assets/img/calender-details.svg'
import { ReactComponent as CloseDetailsModal } from '../assets/img/close-task-form.svg'
import { ReactComponent as MembersIcon } from '../assets/img/members-icon.svg'
import { ReactComponent as LabelsIcon } from '../assets/img/labels-icon.svg'
import { ReactComponent as ChecklistIcon } from '../assets/img/checklist-icon.svg'
import { ReactComponent as DatesIcon } from '../assets/img/dates-icon.svg'
import { ReactComponent as AttachmentIcon } from '../assets/img/attachment-icon.svg'
// import { ReactComponent as CloseDetailsModal } from '../assets/img/cover-icon.svg'

export function TaskDetails () {
  const params = useParams()
  const taskId = params.taskId
  const groupId = params.groupId

  const board = useSelector(state => state.boardModule.board)
  const group = board.groups.find(group => group.id === groupId)
  const task = group.tasks.find(task => task.id === taskId)
  console.log('task:', task)

  return (
    <section className='task-details-view'>
      <div className='task-details-modal'>
        <CloseDetailsModal className='close-details-modal-icon' />
        <section className='details-header'>
          <CalenderIcon className='calender-icon' />
          <textarea
            name='details-title'
            id='details-title'
            placeholder={task.title}
          >
            {task.title}
          </textarea>
        </section>

        <section className='details-content'>
          <section className='details-main-content'></section>

          <section className='details-side-actions'>
            <div className='details-actions'>
            <button className='side-bar-action-btn'>

            </button>
            <button className='side-bar-action-btn'></button>
            <button className='side-bar-action-btn'></button>
            <button className='side-bar-action-btn'></button>
            <button className='side-bar-action-btn'></button>
            <button className='side-bar-action-btn'></button>
            </div>
          </section>
        </section>
      </div>
      <h1>{task.title}</h1>

      <DynamicCmp />
    </section>
  )
}
