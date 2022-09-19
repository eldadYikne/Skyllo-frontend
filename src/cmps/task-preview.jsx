import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TaskDetails } from "./task-details";
import { useState } from 'react'

export function TaskPreview({ task }) {

    const [coverTask, setCoverTask] = useState('')
    const [coverTaskUpper, setCoverTaskUpper] = useState('')
    const [bgColor, setBgColor] = useState(task.cover?.color ? `url(${task.cover.color})` : '')
    const [backgroundStyle, setBackgroundStyle] = useState(task.cover?.color?.length > 9 ? 'backgroundImage' : 'backgroundColor')
    const [heightImg, setHeightImg] = useState('')
    const [textColor, setTextColor] = useState('')
    const [taskTitlePos, setTaskTitlePos] = useState('task-title')

    useEffect(() => {
        loadTaskCover()
    }, [task])


    const loadTaskCover = () => {
        setBackgroundStyle(task.cover?.color?.length > 9 ? 'backgroundImage' : 'backgroundColor')
        if (task.cover?.color?.length > 9) {
            setBgColor(task.cover?.color ? `url(${task.cover.color})` : '')
            setHeightImg(task.cover?.isFullCover ? '192px' : '162px')
            setTaskTitlePos(task.cover?.isFullCover ? 'task-title full ' : 'task-title ')
            if (task.cover.isFullCover) {
                setCoverTask(task.cover?.isDark ? `linear-gradient(180deg,#00000080,#000)` : `linear-gradient(180deg,#ffffff80,#fff)`)
                setTextColor(task.cover?.isDark ? '#ffff' : 'black')
                setCoverTaskUpper(task.cover?.isDark ? ' linear-gradient(180deg,#0000,#00000080)' : ' linear-gradient(180deg,#fff0,#ffffff80)')
            }
        } else {
            setBgColor(task.cover?.color ? task.cover.color : '')
            setHeightImg('32px')
            setTaskTitlePos(task.cover?.isFullCover ? 'task-title text-full ' : 'task-title ')
        }
    }
    return (

        <section className={task.cover?.isFullCover ? "task-preview covered" : "task-preview "}>
            {bgColor &&
                <div style={{ [backgroundStyle]: bgColor, height: heightImg }} className="task-cover-background">
                    {task.cover?.isFullCover && <div>
                        <div className="cover-dark-up" style={{ background: coverTaskUpper }}> </div>
                        <div className="cover-dark-task" style={{ background: coverTask }}></div>
                    </div>}
                </div>
            }

            <p style={{ color: textColor }} className={taskTitlePos}>{task.title}</p>
        </section>
    )
}