
//icons
import { ReactComponent as CloseDetailsModal } from '../assets/img/close-task-form.svg'
import { ReactComponent as MembersIcon } from '../assets/img/members-icon.svg'
import { ReactComponent as LabelsIcon } from '../assets/img/labels-icon.svg'
import { ReactComponent as CoverIcon } from '../assets/img/cover-icon.svg'
import { ReactComponent as ArchiveIcon } from '../assets/img/archive-icon.svg'
import { ReactComponent as TaskIcon } from '../assets/img/task-icon.svg'
import { ReactComponent as DatesIcon } from '../assets/img/dates-icon.svg'
import { ReactComponent as AttachmentIcon } from '../assets/img/attachmaent-iconbig.svg'
import { ReactComponent as ChecklistIcon } from '../assets/img/checklist-icon.svg'
import { ReactComponent as DescriptionIcon } from '../assets/img/description-icon.svg'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeTask, saveTask, updateBoard } from '../store/board.actions'
import { useParams } from 'react-router-dom'
import { DynamicCmp } from './dynamic-cmp'
import { boardService } from '../services/board.service'

export const MiniEdit = ({ task, board, group, setIsMiniEditShown, getMemberBackground, mouseLocation, onToggleLabels }) => {

    const [mouseLocationForDynamic, setMouseLocationForDynamic] = useState(null)

    const dispatch = useDispatch()
    const params = useParams()
    const groupId = params.groupId
    const [currTask, setTask] = useState(JSON.parse(JSON.stringify(task)))

    const [dynamicType, setDynamicType] = useState('')
    const [title, setTitle] = useState('')
    const [taskMembers, setTaskMembers] = useState(null)



    const handleChangeTitle = (ev) => {
        const title = ev.target.value
        setTitle(title)
    }

    const onHandleChangeText = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

    }
    const onSaveTitle = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        if (!title) return
        dispatch(updateBoard(board))
        setIsMiniEditShown(false)
    }
    const onRemoveTask = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        dispatch(removeTask(board._id, group.id, task.id, 'user deleted a task'))
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

    return <section className="mini-edit-task-container" style={{ top: mouseLocation.y + 40, left: mouseLocation.x - 230 }} >
        <div >
            <div className="mini-edit-main-card">
 

                <div className="mini-edit-textarea-container">
                    <textarea name="" id="mini-edit-textarea" onClick={onHandleChangeText} onChange={handleChangeTitle} value={title}></textarea>
                </div>
                <div className='mini-edit-footer'>
                    <div className='mini-edit-characters'>
                        {task.description && <div className="task-preview-pin attachment-pin"><DescriptionIcon /></div>}
                        {task.attachment && <div className="task-preview-pin attachment-pin"><AttachmentIcon /> <span>{task.attachments.length}</span> </div>}
                        {task.checklists && <div className="task-preview-pin mini-edit-checklists-pin"><ChecklistIcon /> <span>{task.checklists.length}</span></div>}
                    </div>

                    <div className='mini-edit-members-container'>
                        {taskMembers && taskMembers.map(member => {
                            return <div key={member._id} className='task-details-member-box' style={{ background: getMemberBackground(member) }}></div>
                        })}
                    </div>

                </div>
            </div>
            <div className="mini-edit-footer">
                <button onClick={onSaveTitle} className='save-mini-edit'>Save</button>
            </div>
        </div>

        <div className="mini-edit-side-bar">
            <button className="mini-edit-actions-btn" >
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
            <button className="mini-edit-actions-btn" name='labels' onClick={onClickEditAction}>
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
                group={group}
                task={task}
                setTask={setTask}
                type={dynamicType}
                setDynamicType={setDynamicType}
                mouseLocation={mouseLocationForDynamic}
            // setSections={setSections}
            // group={group}
            />
        }

    </section>
}