import { useState } from "react"
import { uploadService } from "../../services/upload.service"
import { utilService } from "../../services/util.service"


export const AttachmentCmp = ({ task, setTask }) => {

    const [text, setText] = useState('')
    const [textTitle, setTitleUrl] = useState('')
    const [UploadImg, seUploadImg] = useState('')


    const onChangehandel = () => {
        // setText(text)
        const urlNotImg= text.includes()
        if (!task.attachments) task.attachments = []

        const taskToUpdate = {
            ...task, attachments: [...task.attachments, createAttachment(textTitle, text)]
        }
        if (!textTitle) return
        setTask(taskToUpdate)
    }
   
    const onUploadImg = async (ev) => {
        try {
            const data = await uploadService.uploadImg(ev)
            console.log(data.secure_url);
            if (!task.attachments) task.attachments = []
            const taskToUpdate = {
                ...task, attachments: [...task.attachments, createAttachment(data.original_filename, data.secure_url)]
            }
            setTask(taskToUpdate)
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
            createdAt: Date.now(),
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