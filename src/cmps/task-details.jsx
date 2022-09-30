import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DynamicCmp } from './dynamic-cmp'

//icons//
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
import { ReactComponent as AttachmentBigIcon } from '../assets/img/attachmaent-iconbig.svg'
import { ReactComponent as PlusIcon } from '../assets/img/plus-icon-details.svg'

import { AttachmentDetails } from './task-details/attachmaent-details'
import { removeTask, saveTask } from '../store/board.actions'
import { boardService } from '../services/board.new.service'
import { TaskChecklist } from './task-details/task-checklist'
import { utilService } from '../services/util.service'
import { LoaderSkyllo } from './loader-cmp'
import { FastAverageColor } from 'fast-average-color'


export function TaskDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.userModule.user)
  const board = useSelector(state => state.boardModule.board)
  const groupId = params.groupId
  const taskId = params.taskId
  const group = board.groups.find(group => group.id === groupId)
  const task = group.tasks.find(task => task.id === taskId)

  // const bgColor = task.cover?.color ? task.cover.color.length > 9 ? '#fffff' : task.cover.color : ''
  const bgColorDetailsHedear = task.cover?.color?.length > 9 ? task?.cover?.backgroundColor : task.cover?.color
  const bgColor = task.cover?.color ? bgColorDetailsHedear : ''


  let backgroundStyle = bgColor?.length > 9 ? 'backgroundImage' : 'backgroundColor'

  const [isDescription, setIsDescription] = useState(false)
  const [isChecklist, setIsChecklist] = useState(false)
  const [dynamicType, setDynamicType] = useState('')
  const [mouseLocation, setMouseLocation] = useState(null)


  const [taskLabels, setTaskLabels] = useState(null)
  const [taskMembers, setTaskMembers] = useState(null)
  const [taskTxt, setTaskTxt] = useState({
    title: task.title,
    description: task.description
  })

  const loadLabels = () => {
    if (!task) return
    const labelIds = task.labelIds
    if (!labelIds) {
      return setTaskLabels([])
    }
    const taskLabel = labelIds?.map(id => {
      return boardService.getLabelsById(board, id)
    })
    return setTaskLabels(taskLabel)
  }

  const loadMembers = () => {
    if (!task) return
    const membersIds = task.memberIds
    const taskMembers = membersIds?.map(id => {
      return boardService.getMembersById(board, id)
    })
    return setTaskMembers(taskMembers)
  }

  useEffect(() => {
    loadLabels()
    loadMembers()
  }, [task, board])

  const onSaveTask = (activityTxt) => {
    const text = activityTxt ? activityTxt : 'saved task'
    dispatch(saveTask(board._id, group.id, task, { text, user }))
    if (isDescription) setIsDescription(false)
  }

  const onRemoveTask = (ev) => {
    ev.preventDefault()
    setIsDescription(false)
    dispatch(removeTask(board._id, group.id, task, { text: 'deleted task', user }))
    navigate(-1)
  }

  const onRemoveChecklist = (ev, checklist) => {
    ev.preventDefault()
    const checklistsToUpdate = task.checklists.filter(currChecklist => currChecklist.id !== checklist.id)
    const taskToUpdate = { ...task, checklists: checklistsToUpdate }
    dispatch(saveTask(board._id, group.id, taskToUpdate, { text: `removed checklist ${checklist.title}`, user }))

  }

  const handleChange = ({ target }) => {
    const field = target.name
    const value = target.value
    setTaskTxt({ ...taskTxt, [field]: value })


    // const text = field === 'title' ? 'updated task title' : 'updated task description'
  }

  const onSetTaskTxt = (text) => {
    const newTask = { ...task, title: taskTxt.title, description: taskTxt.description }
    // const newTask = {...task}
    dispatch(saveTask(board._id, group.id, newTask, { text, user }))

  }



  const getMemberBackground = (member) => {
    if (member.img) return `url(${member.img}) center center / cover`
    else return `https://res.cloudinary.com/skello-dev-learning/image/upload/v1643564751/dl6faof1ecyjnfnknkla.svg) center center / cover;`
  }

  const onOpenDynamicCmp = (ev, actionType) => {
    const mouseClickLocation = ev.target.getClientRects()
    setMouseLocation(mouseClickLocation[0].y)
    if (actionType) {
      return setDynamicType(actionType)
    }
    setDynamicType(ev.target.name)
  }

  const onHoverLabel = (ev, color) => {
    ev.target.style.background = utilService.lightenDarkenColor(color, -10);
  }

  const onLeaveHoverLabel = (ev, color) => {
    ev.target.style.background = color
  }

  const getTaskStatus = (dueDate) => {
    if (dueDate.isDone === true) return 'complete'
    else if (dueDate.date < Date.now()) return 'overdue'
    else return ''
  }

  const toggleIsTaskDone = (ev) => {
    ev.stopPropagation()
    // const newTask = structuredClone(task)
    task.dueDate.isDone = !task.dueDate.isDone
    if (task.dueDate.isDone) onSaveTask('Marked task as complete')
    else onSaveTask('Marked task as uncomplete')
  }

  const getBgColorOfImg = async (url, taskToUpdate) => {
    try {
      const currTask = structuredClone(taskToUpdate)
      if (!taskToUpdate.cover.backgroundColor) taskToUpdate.cover.backgroundColor = ''
      const fac = new FastAverageColor();
      const color = await fac.getColorAsync(url)
      taskToUpdate.cover.backgroundColor = color.rgb;
      // dispatch(saveTask(board._id, group.id, task, { text: 'change task image', user: user }))
      return color.rgb
    } catch (err) {
      return '#fffff'

      console.log(err);
    }
  }


  if (!task) return <LoaderSkyllo />
  return (
    <section className='task-details-view'>
      <div className='task-details-modal'>
        {bgColor && <div style={{ background: bgColor }} className='details-bgColor'>
          {task.cover?.color.length > 9 && <img src={task.cover?.color} />}
          <button className='side-bar-action-btn-inCover' onClick={() => setDynamicType('cover')}>
            <CoverIcon /> Cover
          </button>
        </div>}
        <Link key={board._id} to={`/workspace/board/${board._id}`}>
          <div className='close-details-modal-exit'>
            <CloseDetailsModal
              className='close-details-modal-icon'
              onClick={onSaveTask} />
          </div>
        </Link>

        <section className='details-header'>
          <CalenderIcon className='calender-icon' />
          {/* <textarea onChange={(ev) => setDescription(ev.target.value)} */}
          <textarea onChange={handleChange}
            name='title'
            id='details-title'
            value={taskTxt.title}
            onBlur={() => onSetTaskTxt('changed task title')}
          >
            {task.title}
          </textarea>
          <span className='task-details-group-title'>
            in list <span className='task-details-group-name'>{group.title}</span>
          </span>
        </section>
        <section className='details-content'>
          <section className='details-main-content'>
            <section className='first-content'>
              <div className='members-labels-content'>

                <div className='actions-type'>
                  <h4>Members</h4>
                  <div className='action-type-content members-details-content'>
                    {taskMembers && taskMembers.map(member => {
                      {
                        return member?.img ? <div className='task-details-member-box' key={member?._id} style={{ background: getMemberBackground(member) }}></div> :
                          <div key={member?._id} className='avatar-img-guest-member-box'></div>
                      }
                    })}
                    <div className='task-details-member-box-plus-member'
                      onClick={(ev) => onOpenDynamicCmp(ev, 'members')}>
                      <PlusIcon className='plus-icon' />
                    </div>
                  </div>
                </div>

                <div className='actions-type'>
                  <h4>Labels</h4>
                  <div className='action-type-content'>
                    {taskLabels && taskLabels.map(label => {
                      if (!label) return
                      return <div key={label.id} className='task-details-label-box'
                        onMouseEnter={(ev) => onHoverLabel(ev, label.color)}
                        onMouseLeave={(ev) => onLeaveHoverLabel(ev, label.color)}
                        style={{ backgroundColor: label?.color }}>
                        <div className='labels-details-mini-color' style={{ backgroundColor: utilService.lightenDarkenColor(label?.color, -20) }}></div>
                        {label?.title ? label.title : ''}
                      </div>
                    })}
                    <div className='task-details-label-box-plus-label' onClick={(ev) => onOpenDynamicCmp(ev, 'labels')}>
                      <PlusIcon className='plus-icon' />
                    </div>
                  </div>
                </div>
              </div>

              {task.dueDate &&
                <div className='actions-type' onClick={() => setDynamicType('dates')}>
                  <h4>Due date</h4>
                  <div className='action-type-content'>
                    <div className={task.dueDate.isDone ? 'due-date-checkbox checked' : 'due-date-checkbox'} onClick={toggleIsTaskDone}>
                      {task.dueDate.isDone && <span className='checkbox-checked-content'></span>}
                    </div>
                    <div className='task-details-date-container'>
                      <p>{task.dueDate.dateToDisplay} at 07:00 PM</p>
                      <div className={task.dueDate.isDone ? 'complete' : task.dueDate.date < Date.now() ? 'overdue' : 'ontime'}>{getTaskStatus(task.dueDate)}</div>
                    </div>
                  </div>
                </div>
              }
            </section>

            <div className='description-container'>
              <div className='container-title'>
                <DescriptionIcon className='title-icon' />
                <h5>Description</h5>
              </div>
              <textarea
                style={{ backgroundColor: task.description ? 'inherit' : '#091e420a' }}
                onChange={handleChange}
                onClick={() => setIsDescription(true)}
                name='description'
                id='description-textarea-basic'
                value={taskTxt.description ? taskTxt.description : ''}
                placeholder={task.description ? '' : 'Add more details description'}
              ></textarea>
              {isDescription &&
                <div className='description-edit'>
                  <button className='save-description' onMouseDown={() => onSetTaskTxt('changed task description')}>Save</button>
                  <button className='close-description' onClick={() => setIsDescription(false)}>Cancel</button>
                </div>}
            </div>
            {task.attachments && <AttachmentDetails getBgColorOfImg={getBgColorOfImg} task={task} group={group} />}

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

            {task.checklists &&
              task.checklists.map((checklist) => {
                return <TaskChecklist
                  key={checklist.id}
                  task={task}
                  initChecklist={checklist}
                  checklistId={checklist.id}
                  board={board}
                  group={group}
                  onRemoveChecklist={onRemoveChecklist}

                />
              }
              )}
          </section>

          {/*details side-bar: */}
          <section className='details-side-actions'>
            <div className='details-actions'>
              <h5>Add to task</h5>
              <div className='details-actions'>
                <button className='side-bar-action-btn' name='members' onClick={onOpenDynamicCmp} >
                  <MembersIcon /> Members
                </button>
                <button className='side-bar-action-btn' name='labels' onClick={onOpenDynamicCmp}>
                  <LabelsIcon /> Labels
                </button>
                <button className='side-bar-action-btn' name='checklist' onClick={onOpenDynamicCmp}>
                  <ChecklistIcon /> Checklist
                </button>
              </div>
              <div className='details-actions'>
                <button className='side-bar-action-btn' name='dates' onClick={onOpenDynamicCmp}>
                  <DatesIcon /> Dates
                </button>
                <button className='side-bar-action-btn' name='attachment' onClick={onOpenDynamicCmp}>
                  <AttachmentIcon /> Attachment
                </button>
                <button className='side-bar-action-btn' name='cover' onClick={onOpenDynamicCmp}>
                  <CoverIcon /> Cover
                </button>
              </div>
            </div>
            {dynamicType &&
              <DynamicCmp
                mouseLocation={mouseLocation}
                task={task}
                type={dynamicType}
                setDynamicType={setDynamicType}
                group={group}
                setIsChecklist={setIsChecklist}
                board={board}
                getBgColorOfImg={getBgColorOfImg}
              />

            }
            <div className='details-actions'>
              <h5>Actions</h5>
              <button onClick={onRemoveTask}>
                <ArchiveIcon /> Archive
              </button>
            </div>
          </section>
        </section>
      </div>
    </section>
  )
}