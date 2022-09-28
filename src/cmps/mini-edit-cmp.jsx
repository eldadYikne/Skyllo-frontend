
//icons
import { ReactComponent as CloseDetailsModal } from '../assets/img/close-task-form.svg'
import { ReactComponent as MembersIcon } from '../assets/img/members-icon.svg'
import { ReactComponent as LabelsIcon } from '../assets/img/labels-icon.svg'
import { ReactComponent as CoverIcon } from '../assets/img/cover-icon.svg'
import { ReactComponent as ArchiveIcon } from '../assets/img/archive-icon.svg'
import { ReactComponent as TaskIcon } from '../assets/img/task-icon.svg'
import { ReactComponent as DatesIcon } from '../assets/img/dates-icon.svg'
import { ReactComponent as AttachmentIcon } from '../assets/img/attachment-small-icon.svg'
import { ReactComponent as ChecklistIcon } from '../assets/img/checklist-icon.svg'
import { ReactComponent as DescriptionIcon } from '../assets/img/description-icon.svg'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTask, saveTask, updateBoard } from '../store/board.actions'
import { useParams } from 'react-router-dom'
import { DynamicCmp } from './dynamic-cmp'
import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'

export const MiniEdit = ({ task, board, group, setIsMiniEditShown, getMemberBackground, mouseLocation, onToggleLabels, bgColor }) => {

    const [mouseLocationForDynamic, setMouseLocationForDynamic] = useState(null)

    const dispatch = useDispatch()
    const params = useParams()
    const groupId = params.groupId
    
    const user = useSelector(state => state.userModule.user)

    const [mouseLocationTop,setMouseLocationTop] = useState(mouseLocation)
    console.log('mouseLocationTop:', mouseLocationTop)
 


    const [dynamicType, setDynamicType] = useState('')
    const [title, setTitle] = useState('')
    const [taskMembers, setTaskMembers] = useState(null)
   
    const [taskLabels, setTaskLabels] = useState(null)
    // const [bgColor, setBgColor] = useState(task.cover?.color ? `url(${task.cover.color})` : '')
    const [backgroundStyle, setBackgroundStyle] = useState(task.cover?.color?.length > 9 ? 'backgroundImage' : 'backgroundColor')


    const loadTaskCover = () => {

    }


    const loadMembers = () => {
        if (!task) return
        const membersIds = task.memberIds
        const taskMembers = membersIds?.map(id => {
            return boardService.getMembersById(board, id)
        })
        return setTaskMembers(taskMembers)
    }

    const loadLabels = () => {
        if (!task) return
        if (!task.labelIds) return
        const labelIds = task.labelIds
        const taskLabel = labelIds?.map(id => {
            return boardService.getLabelsById(board, id)
        })
        return setTaskLabels(taskLabel)
    }
   
    // useEffect(()=>{
    //     console.log('mouseLocationnnnnnnnnn:', mouseLocation)
        
    //     if (mouseLocation[0].y > 575) { setMouseLocationTop({y:mouseLocation[0].y-400, x:mouseLocation[0].x})}
    //     console.log('mouseLocatioxxxxxxxxxxxxx:', mouseLocation)
    // },[])
    useEffect(() => {
        setTitle(task.title)
        loadMembers()
        loadLabels()

    }, [task.title, task])

    const handleChangeTitle = (ev) => {
        const title = ev.target.value
        setTitle(title)
    }

    const handleClick = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
    }
    const onSaveTitle = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (!title) return
        const taskToUpdate = { ...task, title: title }
        dispatch(saveTask(board._id, group.id, taskToUpdate, { text: 'update task', taskTitle: task.title, taskId: task.id, groupId: group.id, user: user }))
        setIsMiniEditShown(false)
    }

    const onRemoveTask = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        dispatch(removeTask(board._id, group.id, task.id, { text: 'deleted task', taskTitle: task.title, taskId: task.id, groupId: group.id, user: user }))
        setIsMiniEditShown(false)
    }

    const onClickEditAction = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const mouseClickLocation = ev.target.getClientRects()
        setMouseLocationForDynamic(mouseClickLocation[0].y)

        setDynamicType(ev.target.name)
    }

    const labelsOpen = board.toggleLabels
    const labelsClass = labelsOpen ? 'task-preview-label-preview-open' : 'task-preview-label-preview'

    const heightImg = task.cover?.color?.length > 9 ? '135px' : '32px'

    return <section className="mini-edit-task-container" style={{ top: mouseLocation.y-10, left: mouseLocation.x - 230 }} >
        <div className='mini-edit-main-content'>
            <div className='mini-edit-cover'>
            </div>

            {bgColor &&
                <div style={{ [backgroundStyle]: bgColor, height: heightImg }} className="task-cover-background">
                </div>
            }

            <div className="mini-edit-main-card">
                {taskLabels &&
                        <div className="mini-edit-labels-list">
                            {taskLabels.map(label => {
                                return <div
                                    onClick={onToggleLabels}
                                    key={label.color}
                                    className={labelsClass}
                                    style={{ backgroundColor: label.color }}>
                                    {labelsOpen && <div className='labels-task-preview-mini-color' style={{ backgroundColor: utilService.lightenDarkenColor(label.color, -20) }}></div>}
                                    {labelsOpen &&
                                        <span>{label.title}</span>}
                                </div>
                            })}
                        </div>
              
                }

                <div className="mini-edit-textarea-container">
                    <textarea name="" id="mini-edit-textarea" onClick={handleClick} onChange={handleChangeTitle} value={title}></textarea>
                </div>
                <div className='mini-edit-footer' onClick={handleClick}>
                    <div className='mini-edit-characters'>
                        {task.description && <div className="task-preview-pin "><DescriptionIcon /></div>}
                        {task.attachments && <div className="task-preview-pin attachment-pin-div"><AttachmentIcon className='attachment-pin' /> <span>{task.attachments.length}</span> </div>}
                        {task.checklists && <div className="task-preview-pin mini-edit-checklists-pin"><ChecklistIcon /> <span>{task.checklists.length}</span></div>}
                    </div>

                    <div className='mini-edit-members-container'>
                        {taskMembers && taskMembers.map(member => {
                            {
                                return member.img ? <div className='task-details-member-box' key={member._id} style={{ background: getMemberBackground(member) }}></div> :
                                    <div className='avatar-img-guest-member-box' key={member._id}></div>
                            }
                        })}
                    </div>

                </div>
            </div>
            <div className="mini-edit-footer">
                <button onClick={onSaveTitle} className='save-mini-edit'>Save</button>
            </div>
        </div>

        <div className="mini-edit-side-bar">

            <button className="mini-edit-actions-btn" onClick={() => setIsMiniEditShown(false)} >
                <TaskIcon />
                Open task
            </button>

            <button className="mini-edit-actions-btn" name='members' onClick={onClickEditAction}>
                <MembersIcon />
                Change members
            </button>
            <button className="mini-edit-actions-btn" name='cover' onClick={onClickEditAction}>
                <CoverIcon />
                Change cover
            </button>
            <button className="mini-edit-actions-btn" name='labels' onClick={onClickEditAction}>
                <LabelsIcon />
                Edit labels
            </button>
            <button className="mini-edit-actions-btn" name='dates' onClick={onClickEditAction}>
                <DatesIcon />
                Edit dates
            </button>
            <button className="mini-edit-actions-btn" onClick={onRemoveTask}>
                <ArchiveIcon />
                Archive
            </button>
        </div>

        {dynamicType &&
            <DynamicCmp
                comeFromMiniEdit={true}
                group={group}
                task={task}
                type={dynamicType}
                setDynamicType={setDynamicType}
                mouseLocation={mouseLocationForDynamic}
                board={board}
            // setSections={setSections}
            // group={group}
            />
        }

    </section>
}