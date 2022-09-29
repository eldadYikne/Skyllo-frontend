import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as AttachmentBigIcon } from '../../assets/img/attachmaent-iconbig.svg'
import { ReactComponent as MakeCover } from '../../assets/img/attachment-makecover.svg'
import { saveTask, updateBoard } from '../../store/board.actions'
import { ReactComponent as CloseDynamicCmp } from '../../assets/img/close-task-form.svg'
import { useState } from 'react'
import { utilService } from '../../services/util.service'
import moment from 'moment'


export const AttachmentDetails = ({ group, task, getBgColorOfImg }) => {

    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)

    const dispatch = useDispatch()
    const [isEdit, setEdit] = useState(false)
    const [text, setText] = useState('')


    const onRemoveAttachment = (attachmentId) => {
        const newAttachments = task.attachments.filter(attachment => attachment.id !== attachmentId)
        console.log(newAttachments, 'newAttachments')
        task.attachments = newAttachments
        const newTask = structuredClone(task)
        dispatch(saveTask(board._id, group.id, newTask, { text: 'removed attachment', user: user }))
    }
    const onMakeCover = (attachmentUrl) => {
        console.log(' task.cover.backgroundColor', task)
        if (!task.cover) task.cover={}
        if (!task.cover.backgroundColor) task.cover.backgroundColor = ''
        console.log(' task.cover.backgroundColor', task.cover.backgroundColor)
        task.cover.backgroundColor = getBgColorOfImg(attachmentUrl, task)
        
        const taskToUpadet = { ...task, cover: { ...task.cover, color: attachmentUrl } }

        dispatch(saveTask(board._id, group.id, taskToUpadet, { text: 'changed cover', user: user }))
    }
    const onHandelChange = (ev) => {
        ev.preventDefault()
        setText(ev.target.value)
        console.log(ev.target.value);
    }
    const onEdit = (attachmentId, ev) => {
        let currAttachment = task.attachments.find(attachment => attachment.id === attachmentId)
        currAttachment.isEdit = !currAttachment.isEdit
        const newTask = { ...task }
        dispatch(saveTask(board._id, group.id, newTask, { text: 'edited attachment', user: user }))
    }
    const onUpdetAttachment = (attachmentId) => {
        let currAttachment = task.attachments.find(attachment => attachment.id === attachmentId)
        const attachmentToUpdate = { ...currAttachment, title: text }
        const newAttachments = task.attachments.filter(attachment => attachment.id !== attachmentId)
        const taskToUpadet = { ...task, attachments: [...newAttachments, attachmentToUpdate] }
        dispatch(saveTask(board._id, group.id, taskToUpadet, { text: 'edited attachment', user: user }))
        setEdit(true)
    }


    return <div className='description-container'>
        <div className='container-title'>
            <AttachmentBigIcon className='title-icon' />
            <h5>Attachment</h5>
        </div>

        <div className='attachmaent-list'>
            {task.attachments?.map(attachment => {
                return <div key={attachment.id} className='attachment-container'>
                    <div className='img-attachment' >
                        <a href={attachment.url} className='img-url' style={{ background: `url(${attachment.url}) ` }} src={attachment.url} >
                        </a> <a className='img-url no-img'   > <img src={`https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663759814/sprint%204%20/icons8-attachment-32_ppkh9l.png`} /></a>
                    </div>

                    <div className='attachment-detalis'>
                        <p> {attachment.title}</p>
                        <div className='time-line-attachment'>
                            <span>{moment(attachment.createdAt).fromNow()} </span>
                            <span>-</span>
                            <span onClick={() => onRemoveAttachment(attachment.id)} className="delete-span">Delete</span>
                            <span>-</span>
                            <span onClick={() => onEdit(attachment.id)} className="edit-span">Edit</span>
                        </div>
                        <span onClick={() => onMakeCover(attachment.url)} className="make-cover-span"><MakeCover /> Make cover</span>
                    </div>
                    {attachment.isEdit && <div className='edit-attachment-container'>
                        <section className="dynamic-cmp">
                            <section className="dynamic-cmp-header">
                                Edit attachment
                                <button className='dynamic-cmp-close'>
                                    <CloseDynamicCmp onClick={() => onEdit(attachment.id)} />
                                </button>
                            </section>

                            <section className='dynamic-cmp-content'>
                                <input className='input-edit-attachment' type="text" onChange={onHandelChange} />
                                <button onClick={() => onUpdetAttachment(attachment.id)} className='edit-attachment-btn'>update </button>
                            </section>
                        </section>
                    </div>}
                </div>
            })}
        </div>

    </div>
}
