import { useState } from "react"
import { uploadService } from "../../services/upload.service"
import { utilService } from "../../services/util.service"


export const AttachmentCmp = ({ task, setTask }) => {

    const [text, setText] = useState('')
    const [textTitle, setTitleUrl] = useState('')
    const [UploadImg, seUploadImg] = useState('')


    const onChangehandel = () => {
        setText(text)
        if (!task.attachments) task.attachments = []

        const taskToUpdate = {
            ...task, attachments: [...task.attachments,
            {
                id: utilService.makeId(),
                title: textTitle,
                url: text,
                isCover: false,
                isEdit: false,
                createdAt: Date.now(),
            }]
        }
        if (!textTitle) return
        setTask(taskToUpdate)
    }
    const onUploadImg = async (ev) => {
        try {
            console.log('yess');
            const data = await uploadService.uploadImg(ev)
            console.log(data.secure_url)
            const taskToUpdate = {
                ...task, attachments: [...task.attachments,
                {
                    id: utilService.makeId(),
                    title: data.original_filename,
                    url: data.secure_url,
                    isCover: false,
                    isEdit: false,
                    createdAt: Date.now(),
                }]
            }
            setTask(taskToUpdate)
        } catch (err) {
            console.log(err);
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