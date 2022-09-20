import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as AttachmentBigIcon } from '../../assets/img/attachmaent-iconbig.svg'
import { ReactComponent as MakeCover } from '../../assets/img/attachment-makecover.svg'
import { updateBoard } from '../../store/board.actions'
import { ReactComponent as CloseDynamicCmp } from '../../assets/img/close-task-form.svg'
import { useState } from 'react'


export const AttachmentDetails = ({ task, setTask }) => {

    const [isEdit, setEdit] = useState(false)
    const [text, setText] = useState('')


    const onRemoveAttachment = (attachmentId) => {
        const newAttachments = task.attachments.filter(attachment => attachment.id !== attachmentId)
        console.log(newAttachments, 'newAttachments')
        const taskToUpadet = { ...task, attachments: [...newAttachments] }
        setTask(taskToUpadet)
    }
    const onMakeCover = (attachmentUrl) => {
        const taskToUpadet = { ...task, cover: { ...task.cover, color: attachmentUrl } }
        setTask(taskToUpadet)
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
        setTask(newTask)
    }
    const onUpdetAttachment = (attachmentId) => {
        let currAttachment = task.attachments.find(attachment => attachment.id === attachmentId)
        const attachmentToUpdate = { ...currAttachment, title: text }
        const newAttachments = task.attachments.filter(attachment => attachment.id !== attachmentId)
        const taskToUpadet = { ...task, attachments: [...newAttachments, attachmentToUpdate] }
        setTask(taskToUpadet)
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
                        </a>
                    </div>

                    <div className='attachment-detalis'>
                        <p> {attachment.title}</p>
                        <div className='time-line-attachment'>
                            <span>{attachment.createdAt} </span>
                            <span>-</span>
                            <sapn onClick={() => onRemoveAttachment(attachment.id)} className="delete-span">Delete</sapn>
                            <span>-</span>
                            <sapn onClick={() => onEdit(attachment.id)} className="edit-span">Edit</sapn>
                        </div>
                        <sapn onClick={() => onMakeCover(attachment.url)} className="make-cover-span"><MakeCover /> Make Cover</sapn>
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
