import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { DynamicCmp } from './dynamic-cmp'

import { ReactComponent as CalenderIcon } from '../assets/img/calender-details.svg'
import { ReactComponent as CloseDetailsModal } from '../assets/img/close-task-form.svg'
import { ReactComponent as MembersIcon } from '../assets/img/members-icon.svg'
import { ReactComponent as LabelsIcon } from '../assets/img/labels-icon.svg'
import { ReactComponent as ChecklistIcon } from '../assets/img/checklist-icon.svg'
import { ReactComponent as DatesIcon } from '../assets/img/dates-icon.svg'
import { ReactComponent as AttachmentIcon } from '../assets/img/attachment-icon.svg'
import { ReactComponent as CoverIcon } from '../assets/img/cover-icon.svg'
import { ReactComponent as ArchiveIcon } from '../assets/img/archive-icon.svg'
import { ReactComponent as DescriptionIcon } from '../assets/img/description-icon.svg'
import { ReactComponent as ActivityIcon } from '../assets/img/activity-icon.svg'
import { useState } from 'react'

export function TaskDetails () {
  const params = useParams()
  const taskId = params.taskId
  const groupId = params.groupId

  const board = useSelector(state => state.boardModule.board)
  const group = board.groups.find(group => group.id === groupId)
  const task = group.tasks.find(task => task.id === taskId)

  const [descriptionEdit, setDescriptionEdit] = useState(true)

  const descriptionShow = () => {
    setDescriptionEdit(!descriptionEdit)
  }

  return (
    <section className='task-details-view'>
      <div className='task-details-modal'>
        <Link key={board._id} to={`/workspace/board/${board._id}`}>
          <CloseDetailsModal className='close-details-modal-icon' />
        </Link>

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
          <section className='details-main-content'>
            <section className='first-content'>
              <div className='actions-type'>
                <h4>Members</h4>
                <div className='action-type-content'></div>
              </div>

              <div className='actions-type'>
                <h4>Labels</h4>
                <div className='action-type-content'></div>
              </div>
            </section>

            <div className='description-container'>
              <div className='container-title'>
                <DescriptionIcon className='title-icon' />
                <h5>Description</h5>
              </div>
              <textarea
                onClick={descriptionShow}
                name=''
                id='description-textarea-basic'
                placeholder='task description'
              ></textarea>

              <div className='description-edit'>
                <button className='save-description'>Save</button>
                <CloseDetailsModal
                  className='close-description-edit'
                  onClick={descriptionShow}
                />
              </div>
            </div>

            <div className='activity-container'>
              <div className='container-title'>
                <ActivityIcon className='title-icon' />
                <h5>Activity</h5>
              </div>
              <textarea
                name=''
                id='activity-textarea'
                placeholder='Comment..'
              ></textarea>
            </div>
          </section>

          {/*details side-bar: */}
          <section className='details-side-actions'>
            <div className='details-actions'>
              <h5>Add to task</h5>
              <div className='details-actions'>
                <button className='side-bar-action-btn'>
                  <MembersIcon /> Members
                </button>
                <button className='side-bar-action-btn'>
                  <LabelsIcon /> Labels
                </button>
                <button className='side-bar-action-btn'>
                  <ChecklistIcon /> Checklist
                </button>
              </div>
              <div className='details-actions'>
                <button className='side-bar-action-btn'>
                  <DatesIcon /> Dates
                </button>
                <button className='side-bar-action-btn'>
                  <AttachmentIcon /> Attachment
                </button>
                <button className='side-bar-action-btn'>
                  <CoverIcon /> Cover
                </button>
              </div>
            </div>

            <div className='details-actions'>
              <h5>Actions</h5>
              <button>
                <ArchiveIcon /> Archive
              </button>
            </div>
          </section>
        </section>
      </div>
      <DynamicCmp />
    </section>
  )
}
