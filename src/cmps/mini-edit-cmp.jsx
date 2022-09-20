
import { ReactComponent as CloseDetailsModal } from '../assets/img/close-task-form.svg'
import { ReactComponent as MembersIcon } from '../assets/img/members-icon.svg'
import { ReactComponent as LabelsIcon } from '../assets/img/labels-icon.svg'
import { ReactComponent as CoverIcon } from '../assets/img/cover-icon.svg'
import { ReactComponent as ArchiveIcon } from '../assets/img/archive-icon.svg'
import { ReactComponent as TaskIcon } from '../assets/img/task-icon.svg'
import { ReactComponent as DatesIcon } from '../assets/img/dates-icon.svg'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBoard } from '../store/board.actions'
import { useParams } from 'react-router-dom'
import { DynamicCmp } from './dynamic-cmp'

export const MiniEdit = ({task,board,setIsMiniEditShown}) => {

    const dispatch = useDispatch()
    const params = useParams()
    const groupId = params.groupId
    const [dynamicType, setDynamicType] = useState('')
    const [initTask, setTask] = useState(JSON.parse(JSON.stringify(task)))
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTitle(task.title)
      }, [task.title])
    

      const handleChangeTitle = (ev)=>{
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


      const onClickEditAction =(ev)=>{
        ev.preventDefault()
        ev.stopPropagation()

        setDynamicType(ev.target.name)
      }

    return <section className="mini-edit-task-container" >

        <div className="mini-edit-main-card">
            <div className="mini-edit-header"></div>
            <div className="mini-edit-textarea-container">
                <textarea name="" id="mini-edit-textarea" onClick={onHandleChangeText} onChange={handleChangeTitle} value={title}></textarea>
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
            <button className="mini-edit-actions-btn">
                <ArchiveIcon />
                Archive
            </button>
        </div>
        {dynamicType &&
              <DynamicCmp
                task={task}
                setTask={setTask}
                type={dynamicType}
                setDynamicType={setDynamicType}
                // setSections={setSections}
                // group={group}
              />

            }

    </section>
}