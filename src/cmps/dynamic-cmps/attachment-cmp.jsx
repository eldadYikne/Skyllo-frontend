import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { uploadService } from "../../services/upload.service"
import { utilService } from "../../services/util.service"
import { saveTask } from "../../store/board.actions"


export const AttachmentCmp = ({ group, task }) => {

    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)

    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [textTitle, setTitleUrl] = useState('')


    const onChangehandel = () => {
        const urlNotImg = text.includes()
        if (!task.attachments) task.attachments = []
        if (!textTitle) return
        task.attachments.push(createAttachment(textTitle, text))
        const taskToUpdate = structuredClone(task)
        dispatch(saveTask(board._id, group.id, task, {text: 'added an attachment', user}))
    }
   
    const onUploadImg = async (ev) => {
        try {
            const data = await uploadService.uploadImg(ev)
            console.log(data.secure_url);
            if (!task.attachments) task.attachments = []
            const taskToUpdate = {
                ...task, attachments: [...task.attachments, createAttachment(data.original_filename, data.secure_url)]
            }
            dispatch(saveTask(board._id, group.id, taskToUpdate, {text: 'uploaded image', user}))
        } catch (err) {
            console.log(err);
        }
    }
    const createAttachment = (title, url) => {
        return {
            id: utilService.makeId(),
            title: title,
            url: url,
            isCover: false,
            isEdit: false,
            createdAt: new Date(),
        }
    }

    return <section className="attachment-cmp">
        <div className="upload-source"><input className="input-computer-upload" type="file" onChange={onUploadImg} />
            Computer</div>
        <div className="upload-input">
            <label htmlFor="source">Attach a link</label>

            <input type="text" name="" id="source" placeholder="Paste link here" onChange={(ev) => setText(ev.target.value)} />
            {text && <div>
                <label htmlFor="title">Link name</label>
                <input type="text" name="" id="title" placeholder="Paste title here" onChange={(ev) => setTitleUrl(ev.target.value)} />
            </div>}
        </div>

        <div className="attach-btn">
            <button onClick={() => onChangehandel()} >Create</button>
        </div>

    </section>

}