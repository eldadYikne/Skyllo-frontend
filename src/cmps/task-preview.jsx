import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TaskDetails } from "./task-details";

export function TaskPreview({ task }) {

    let bgColor = task.cover ? task.cover : ''
    let backgroundStyle = bgColor?.length > 9 ? 'backgroundImage' : 'backgroundColor'
    let heightImg
    if (bgColor?.length > 9) {
        bgColor = `url(${bgColor})`
        heightImg = '162px'
    } else {
        heightImg = '32px'
    }

    return (


        <section className="task-preview">
            {bgColor && <div style={{ [backgroundStyle]: bgColor, height:heightImg  }} className="task-cover-background"> </div>}
            <p>{task.title}</p>
        </section>
    )
}