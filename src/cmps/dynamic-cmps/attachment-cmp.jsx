import { useState } from "react"



export const AttachmentCmp = ({ task, setTask }) => {

    const [text, setText] = useState('')
    const [textTitle, setTitleUrl] = useState('')



    const onChangehandel = () => {
        setText(text)
        console.log(text, 'tetx')
        if (!task.attachments) task.attachments = []
        const taskToUpdate = {
            ...task, attachments: [...task.attachments,
            {
                title: textTitle,
                url: text,
                isCover: false,
                createdAt: Date.now(),
            }]
        }
        if (!text || !textTitle) return
        setTask(taskToUpdate)
    }

    console.log(text, 'tetx')

    return <section className="attachment-cmp">
        <div className="upload-source">Computer</div>
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